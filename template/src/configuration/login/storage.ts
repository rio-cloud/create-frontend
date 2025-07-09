// Try to save some data to check if localStorage is not turned of in the Browser.
const supportsLocalStorage = (window: Window) => {
    try {
        const key = 'RIO_SUPPORTS_LOCAL_STORAGE';
        window.localStorage.setItem(key, 'true');
        const isSupported = window.localStorage.getItem(key);
        window.localStorage.removeItem(key);
        return isSupported;
    } catch (_) {
        console.warn('[feature/login] localStorage not supported!');
        return false;
    }
};

export const configureStorage = (window: Window) => {
    if (supportsLocalStorage(window) !== false) {
        const { localStorage } = window;
        const routeKey = 'oauth_initial_route';
        const timestampKey = 'oauth_login_redirect_timestamp';
        return {
            clear: () => {
                localStorage.removeItem(routeKey);
                localStorage.removeItem(timestampKey);
            },
            getRoute: () => localStorage.getItem(routeKey),
            saveRoute: (route: string) => localStorage.setItem(routeKey, route),
            getLoginRedirectTimestamp: () => localStorage.getItem(timestampKey),
            saveLoginRedirectTimestamp: (timestamp: string) => localStorage.setItem(timestampKey, timestamp),
        };
    }

    console.warn('[feature/login] LocalStorage for saving "oauth_state" not available!');

    // This is bad, should we proceed and how?
    return {
        clear: () => {},
        getRoute: () => '/',
        saveRoute: () => {},
        getLoginRedirectTimestamp: () => null,
        saveLoginRedirectTimestamp: () => {},
    };
};

export const loginStorage = configureStorage(window ?? {});
