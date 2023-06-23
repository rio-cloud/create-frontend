import { describe, expect } from 'vitest';
import { configureAccessToken, extractAccessTokenFromWindowLocation, StorageUtil } from '../accessToken';

describe('features/tokenHandling/accessToken', () => {
    const hashWin = (token: string) =>
        ({
            location: {
                href: `https://airmonads.rio.cloud/#access_token=${token}`,
            },
        } as Window);

    const queryWin = (token: string) =>
        ({
            location: {
                href: `https://airmonads.rio.cloud/redirectlogin?access_token=${token}`,
            },
        } as Window);

    const makeWin = (token: string) =>
        ({
            location: {
                host: 'water.rio.cloud',
                href: `https://water.rio.cloud/#access_token=${token}`,
            },
        } as Window);

    describe('the access token extraction from the window.location', () => {
        const extract = extractAccessTokenFromWindowLocation;

        it('should be OK when no window is present', () => {
            const defaultValue = undefined;

            expect(extract()).toEqual(defaultValue);
            expect(extract({} as Window)).toEqual(defaultValue);
        });

        it('should find the token from a redirect url from hash', () => {
            const win = hashWin('aang');
            expect(extract(win)).toEqual('aang');
        });

        it('should find the token from a redirect url from query', () => {
            const win = queryWin('aang');
            expect(extract(win)).toEqual('aang');
        });
    });

    describe('configureAccessToken', () => {
        const fakeStorage = (initialToken?: string) => {
            let accessToken = initialToken;
            return {
                getAccessToken: () => accessToken,
                saveAccessToken: (token: string) => (accessToken = token),
                discardAccessToken: () => {},
                hasAccessToken: () => {},
            } as StorageUtil;
        };

        it('should extract and store the token from the url', () => {
            const win = makeWin('katara');
            const storage = fakeStorage();
            const api = configureAccessToken(win, storage);

            expect(api.getAccessToken()).toEqual('katara');
        });

        it('should be able to cope with a non-existent window gracefully', () => {
            const storage = fakeStorage('untouched-token');
            const api = configureAccessToken(undefined, storage);

            expect(api.getAccessToken()).toEqual('untouched-token');
        });
    });
});
