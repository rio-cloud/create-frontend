import type { AccessToken } from './tokenSlice';

export type StorageUtil = {
    discardAccessToken: () => void;
    getAccessToken: () => string;
    hasAccessToken: () => void;
    saveAccessToken: (token: AccessToken) => void;
};

export const configureStorage = () => {
    let storedAccessToken: AccessToken;
    return {
        discardAccessToken: () => {
            storedAccessToken = null;
        },
        getAccessToken: () => storedAccessToken,
        hasAccessToken: () => Boolean(storedAccessToken),
        saveAccessToken: (token: AccessToken) => {
            storedAccessToken = token;
        },
    } as StorageUtil;
};

export const extractAccessTokenFromWindowLocation = (window?: Window) => {
    if (!window || !window.location || !window.location.href || typeof window.location.href !== 'string') {
        return;
    }

    let token: string | undefined;

    const replacer = (substring: string, arg: string): string => {
        token = arg;
        return substring;
    };

    window.location.href.replace(/access_token=([^&]+)/u, replacer);

    return token;
};

export const configureAccessToken = (window: Window | undefined, storage: StorageUtil) => {
    const urlToken = extractAccessTokenFromWindowLocation(window);

    if (urlToken) {
        storage.saveAccessToken(urlToken);
    }

    return storage;
};

export const accessToken = configureAccessToken(window, configureStorage());
