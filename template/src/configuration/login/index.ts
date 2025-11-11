import { EVENT_USER_LANGUAGE_CHANGED, EVENT_USER_PROFILE_CHANGED } from '@rio-cloud/rio-user-menu-component';
import { Log, UserManager, type UserProfile } from 'oidc-client-ts';

import { config } from '../../config';
import { runInBackground } from '../setup/backgroundActions';
import { addBreadcrumbToSentry, reportErrorToSentry } from '../setup/sentry';
import { trace } from '../setup/trace';
import { mockSession, shouldMockAuthentication } from './mockAuthentication';
import { loginStorage } from './storage';
import { configureUserManager } from './userManagerConfiguration';

export type UserSessionHooks = {
    onSessionExpired: () => void;
    onSessionRenewed: (result: SessionRenewedResult) => void;
};

export type SessionRenewedResult = {
    accessToken: string;
    idToken: string | null;
    profile: UserProfile;
    locale: string;
};

export const ensureUserIsLoggedIn = async (renderApp: () => void, userSessionHooks: UserSessionHooks) => {
    // A silent signin within an iframe will eventually lead to a redirect from
    // the auth-server back to our application. In this case we should only
    // notify the parent frame about the result of the silent signin and
    // not render anything.
    if (isSilentSigninRedirect()) {
        await notifyParentFrameAboutSilentSigninResult();
        return;
    }

    if (shouldMockAuthentication()) {
        userSessionHooks.onSessionRenewed(mockSession);
        renderApp();
        return;
    }

    try {
        const userManager = configureUserManager(userSessionHooks);
        const signedInUser = await performLoginFlow(userManager);

        if (signedInUser) {
            const signInSilent = () => runInBackground(userManager.signinSilent());
            document.addEventListener(EVENT_USER_LANGUAGE_CHANGED, signInSilent);
            document.addEventListener(EVENT_USER_PROFILE_CHANGED, signInSilent);

            renderApp();
        }
    } catch (error) {
        trace('could not start application', error);
        reportErrorToSentry(error);
    }
};

const isSilentSigninRedirect = () => {
    const isSilentRedirectFromAuthServer = window.location.href.startsWith(config.login.silentRedirectUri as string);
    const isRunningInAnIframe = 'parent' in window && window.parent !== window;

    return isSilentRedirectFromAuthServer && isRunningInAnIframe;
};

const notifyParentFrameAboutSilentSigninResult = async () => {
    Log.setLogger(console);
    Log.setLevel(Log.INFO);

    const userManager = new UserManager({
        authority: `${config.login.authority}`,
        client_id: `${config.login.clientId}`,
        redirect_uri: `${config.login.redirectUri}`,
    });

    await userManager.signinSilentCallback();
};

const performLoginFlow = async (userManager: UserManager) => {
    const isNormalRedirectFromAuthServer = window.location.href.startsWith(config.login.redirectUri as string);

    if (isNormalRedirectFromAuthServer) {
        return handleSigninRedirect(userManager);
    }

    return startSigninProcess(userManager);
};

const handleSigninRedirect = async (userManager: UserManager) => {
    const initialRoute = loginStorage.getRoute();
    const loginRedirectTimestamp = loginStorage.getLoginRedirectTimestamp();

    const replacementUrl =
        initialRoute !== null && initialRoute !== ''
            ? `${window.location.origin}#/${initialRoute}`
            : `${window.location.origin}${window.location.hash}`;

    addBreadcrumbToSentry({
        category: 'oauth',
        level: 'info',
        message: 'Handling OAuth signin redirect',
        data: { initialRoute, loginRedirectTimestamp, replacementUrl },
    });

    await redirectIfStoredStateIsMissing(userManager, replacementUrl);

    try {
        const user = await userManager.signinCallback();

        trace('Signin callback processing was successful');

        return user ?? null;
    } catch (error) {
        trace('Signin callback processing failed', error);
        throw error;
    } finally {
        loginStorage.clear();

        // We never want to stay on the redirect page and also want to prevent the
        // user to come back to via the back button, because reloading this page
        // will just lead to another error. Therefore, we replace here instead of
        // push. We deliberately use the history API, because the
        // window.location.replace function triggers a full page reload which
        // leads to another silent signin.
        trace(`Changing location to "${replacementUrl}"`);
        window.history.replaceState({}, '', replacementUrl);
    }
};

// Currently we know of two ways this case might happen:
//
// 1. With multiple tabs of the application:
//     - One tab waits on the login form for some time (more than the stale timeout)
//     - The user than performs a login in a second tab
//    The second tab could then remove the now stale state value of the first tab.
//
// 2. Pressing the back button is another way to trigger this case. Using the back
//    button brings one back to the login form. But the login form still uses
//    the old redirect URL for the already removed state. The user can enter their
//    credentials again and will be redirected to the outdated URL.
//
// There might also be other scenarios to reach this branch.
const redirectIfStoredStateIsMissing = async (userManager: UserManager, redirectUrl: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    const state = searchParams.get('state');

    if (state !== null && (await userManager.settings.stateStore.get(state)) === null) {
        addBreadcrumbToSentry({
            category: 'oauth',
            level: 'warning',
            message: 'Redirecting due to missing stored state',
            data: {
                redirectUrl,
            },
        });

        loginStorage.clear();

        // We want a real page reload, which will either:
        //  - perform a silent signin, which succeeds if the user already has a session from another login
        //  - trigger a new redirection that brings us back here with a valid state value.
        // We use replace here to override the redirect URL and prevent the back button to go
        // back to the redirect page.
        window.location.replace(redirectUrl);

        // The window.location.replace call runs in the background. We do not want
        // to continue with the rest of the authorization flow. This would just lead
        // to a thrown error from signinCallback(), which we would see in the monitoring.
        // Therefore, we block this promise to let the navigation happen.
        await new Promise<never>(() => {});
    }
};

const startSigninProcess = async (userManager: UserManager) => {
    const user = await trySilentSignin(userManager);

    if (user !== null) {
        return user;
    }

    if (config.login.preventRedirect) {
        trace('Redirect prevented due to config');
        return null;
    }

    await redirectUserToLoginPage(userManager);

    return null;
};

const trySilentSignin = async (userManager: UserManager) => {
    try {
        const user = await userManager.signinSilent();

        trace('Silent signin succeeded');

        return user;
    } catch (error) {
        trace('Silent signin failed', error);

        addBreadcrumbToSentry({
            category: 'oauth',
            level: 'error',
            message: 'Error during silent signing',
            data: {
                error,
            },
        });

        return null;
    }
};

const redirectUserToLoginPage = async (userManager: UserManager) => {
    const initialRoute = [window.location.hash, window.location.search].join('').replace(/^#\/?/u, '');
    const redirectTimestamp = new Date().toISOString();
    trace('Saving OAuth redirect data', { initialRoute, redirectTimestamp });

    loginStorage.saveRoute(initialRoute);
    loginStorage.saveLoginRedirectTimestamp(redirectTimestamp);

    await userManager.signinRedirect();
};
