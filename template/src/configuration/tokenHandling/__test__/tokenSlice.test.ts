import type { UserProfile as Profile } from 'oidc-client-ts';

import { store } from '../../setup/store';
import { accessTokenStored, getAccessToken, getIdToken, idTokenStored } from '../tokenSlice';

describe('configuration/tokenHandling/tokenSlice', () => {
    it('should store the access token', () => {
        const dummyAccessToken = 'dummy';

        store.dispatch(accessTokenStored(dummyAccessToken));

        expect(getAccessToken(store.getState())).toEqual(dummyAccessToken);
    });

    it('should store the id token', () => {
        const dummyIdToken = 'dummy';

        store.dispatch(idTokenStored(dummyIdToken));

        expect(getIdToken(store.getState())).toEqual(dummyIdToken);
    });
});
