import {
    ErrorResponse,
    InMemoryWebStorage,
    User,
    UserManager,
    UserManagerSettings,
    WebStorageStateStore,
} from 'oidc-client-ts';
import { UserSessionHooks, SessionRenewedResult } from '.';
import { config } from '../../config';
import join from 'lodash/fp/join';

const RETRY_SIGNIN_TIMEOUT_IN_MS = 30000;

const isErrorResponse = (error: unknown): error is ErrorResponse => error instanceof ErrorResponse;

const retrySigninSilent = (onSessionExpired: () => void, userManager: UserManager) => {
    userManager.signinSilent().catch((error: Error) => {
        if (isErrorResponse(error) && error.error === 'login_required') {
            onSessionExpired();
        } else {
            setTimeout(() => retrySigninSilent(onSessionExpired, userManager), RETRY_SIGNIN_TIMEOUT_IN_MS);
        }
    });
};

const adaptPublishedInfo = (result: User): SessionRenewedResult => ({
    accessToken: result.access_token,
    idToken: result.id_token ?? null,
    locale: result.profile?.locale ?? 'en-GB',
    profile: result.profile,
});

export const getUserManagerSettings = (): UserManagerSettings => {
    const redirectUri = config.login.redirectUri;
    const silentRedirectUri = config.login.silentRedirectUri;

    return {
        authority: `${config.login.authority}`,
        client_id: `${config.login.clientId}`,
        loadUserInfo: false,
        redirect_uri: `${redirectUri}`,
        response_type: 'code',
        scope: join(' ', config.login.oauthScope),
        silent_redirect_uri: `${silentRedirectUri || redirectUri}`,
        includeIdTokenInSilentRenew: false,
        automaticSilentRenew: true,
        monitorSession: true,
        staleStateAgeInSeconds: 600,
        userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() }),
        filterProtocolClaims: false,
    };
};

export const configureUserManager = ({ onSessionRenewed, onSessionExpired }: UserSessionHooks): UserManager => {
    const userManager = new UserManager(getUserManagerSettings());

    userManager.events.addUserLoaded(user => {
        onSessionRenewed(adaptPublishedInfo(user));
    });

    userManager.events.addUserUnloaded(onSessionExpired);

    userManager.events.addSilentRenewError(() => {
        retrySigninSilent(onSessionExpired, userManager);
    });

    userManager.events.addUserSignedOut(onSessionExpired);

    return userManager;
};
