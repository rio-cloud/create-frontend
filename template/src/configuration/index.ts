import { configureFetchDisplayMessages } from './lang/services';
import type { UserSessionHooks, SessionRenewedResult } from './login';
import { userProfileObtained, userSessionExpired, userSessionRenewed } from './login/loginSlice';
import { mapUserProfile } from './login/userProfile';
import { runInBackground } from './setup/backgroundActions';
import { store } from './setup/store';
import { trace } from './setup/trace';
import { accessToken } from './tokenHandling/accessToken';
import { accessTokenStored, idTokenStored } from './tokenHandling/tokenSlice';

export const getUserSessionHooks = (): UserSessionHooks => {
    const fetchDisplayMessages = configureFetchDisplayMessages(store);

    return {
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
            store.dispatch(userProfileObtained(mapUserProfile(result.profile)));

            store.dispatch(userSessionRenewed());

            // You will need to get the user language yourself then
            // you may fetch the suitable messages. Depending
            // on when and from where you fetch the user settings you might
            // want to employ a loading spinner while the request is ongoing.
            runInBackground(fetchDisplayMessages(result.locale));
        },
    };
};
