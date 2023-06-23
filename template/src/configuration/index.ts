import { extractLanguage } from './lang/lang';
import { configureFetchDisplayMessages } from './lang/services';
import { configureMockUserManager, configureUserManager, createUserManager, SessionRenewedResult } from './login/login';
import { accessToken } from './tokenHandling/accessToken';
import { trace } from './setup/trace';
import { attemptInitialSignIn } from './setup/oauth';
import { config } from '../config';
import { reportErrorToSentry } from './setup/sentry';
import { store } from './setup/store';
import { accessTokenStored, idTokenStored } from './tokenHandling/tokenSlice';
import { userProfileObtained, userSessionExpired, userSessionRenewed } from './login/loginSlice';
import { getLocale } from './lang/langSlice';
import { UserManager } from 'oidc-client-ts';
import { EVENT_USER_LANGUAGE_CHANGED, EVENT_USER_PROFILE_CHANGED } from '@rio-cloud/rio-user-menu-component';

export interface OAuthConfig {
    onSessionExpired: Function;
    onSessionRenewed: Function;
}

export const main = async (renderApp: Function) => {
    const fetchDisplayMessages = configureFetchDisplayMessages(store);

    // We want the `<html lang>` attribute to be synced with the
    // language currently displayed
    store.subscribe(() => {
        const lang = extractLanguage(getLocale(store.getState()));
        const html = document.querySelector('html');

        if (html && lang && html.getAttribute('lang') !== lang) {
            html.setAttribute('lang', lang);
        }
    });

    const oauthConfig = {
        onSessionExpired: () => {
            accessToken.discardAccessToken();
            store.dispatch(userSessionExpired());
        },
        onSessionRenewed: (result: SessionRenewedResult) => {
            trace('index.onTokenRenewed', result);

            accessToken.saveAccessToken(result.accessToken);
            store.dispatch(accessTokenStored(result.accessToken));
            store.dispatch(idTokenStored(result.idToken));
            store.dispatch(userProfileObtained(result.profile));

            store.dispatch(userSessionRenewed());

            // You will need to get the user language yourself then
            // you may fetch the suitable messages. Depending
            // on when and from where you fetch the user settings you might
            // want to employ a loading spinner while the request is ongoing.
            fetchDisplayMessages(result.locale);
        },
    } as OAuthConfig;

    const userManager: UserManager = config.login.mockAuthorization
        ? configureMockUserManager(oauthConfig)
        : configureUserManager(oauthConfig, createUserManager());

    const signinSilent = userManager.signinSilent.bind(userManager);
    document.addEventListener(EVENT_USER_LANGUAGE_CHANGED, () => signinSilent());
    document.addEventListener(EVENT_USER_PROFILE_CHANGED, () => signinSilent());

    try {
        await userManager.clearStaleState();
        await attemptInitialSignIn(userManager);
        renderApp();
    } catch (error) {
        trace('could not start application', error);
        reportErrorToSentry(error);
    }
};
