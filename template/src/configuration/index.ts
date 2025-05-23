import { extractLanguage } from './lang/lang';
import { configureFetchDisplayMessages } from './lang/services';
import {
    configureMockUserManager,
    configureUserManager,
    createUserManager,
    type SessionRenewedResult,
} from './login/login';
import { accessToken } from './tokenHandling/accessToken';
import { trace } from './setup/trace';
import { performLoginFlow } from './setup/oauth';
import { config } from '../config';
import { reportErrorToSentry } from './setup/sentry';
import { accessTokenStored, idTokenStored } from './tokenHandling/tokenSlice';
import { userProfileObtained, userSessionExpired, userSessionRenewed } from './login/loginSlice';
import { getLocale } from './lang/langSlice';
import type { UserManager } from 'oidc-client-ts';
import { EVENT_USER_LANGUAGE_CHANGED, EVENT_USER_PROFILE_CHANGED } from '@rio-cloud/rio-user-menu-component';
import { runInBackground } from './setup/backgroundActions';
import { store } from './setup/store';

export interface OAuthConfig {
    onSessionExpired: () => void;
    onSessionRenewed: (result: SessionRenewedResult) => void;
}

export const main = async (renderApp: () => void) => {
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
            trace('oauthConfig: User session expired');
            accessToken.discardAccessToken();
            store.dispatch(accessTokenStored(null));
            store.dispatch(userSessionExpired());
        },
        onSessionRenewed: (result: SessionRenewedResult) => {
            trace('oauthConfig.onSessionRenewed', result);

            accessToken.saveAccessToken(result.accessToken);
            store.dispatch(accessTokenStored(result.accessToken));
            store.dispatch(idTokenStored(result.idToken));
            store.dispatch(userProfileObtained(result.profile));

            store.dispatch(userSessionRenewed());

            // You will need to get the user language yourself then
            // you may fetch the suitable messages. Depending
            // on when and from where you fetch the user settings you might
            // want to employ a loading spinner while the request is ongoing.
            runInBackground(fetchDisplayMessages(result.locale));
        },
    } as OAuthConfig;

    // enables mocking of authentication in non-production
    const isAllowedToMockAuth = import.meta.env.MODE !== 'production';
    const userManager: UserManager =
        isAllowedToMockAuth && config.login.mockAuthorization
            ? configureMockUserManager(oauthConfig)
            : configureUserManager(oauthConfig, createUserManager());

    const signInSilent = () => runInBackground(userManager.signinSilent());
    document.addEventListener(EVENT_USER_LANGUAGE_CHANGED, signInSilent);
    document.addEventListener(EVENT_USER_PROFILE_CHANGED, signInSilent);

    try {
        const signedInUser = await performLoginFlow(userManager);
        if (signedInUser) {
            renderApp();
        }
    } catch (error) {
        trace('could not start application', error);
        reportErrorToSentry(error);
    }
};
