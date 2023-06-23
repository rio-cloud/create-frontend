export interface StorageUtil {
    discardAccessToken: Function;
    getAccessToken: Function;
    hasAccessToken: Function;
    saveAccessToken: Function;
}

export const configureStorage = () => {
    let storedAccessToken: string | null = null;
    return {
        discardAccessToken: () => {
            storedAccessToken = null;
        },
        getAccessToken: () => storedAccessToken,
        hasAccessToken: () => Boolean(storedAccessToken),
        saveAccessToken: (token: string) => {
            storedAccessToken = token;
        },
    } as StorageUtil;
};

export const extractAccessTokenFromWindowLocation = (window?: Window) => {
    if (!window || !window.location || !window.location.href || typeof window.location.href !== 'string') {
        return;
    }

    let token;

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
