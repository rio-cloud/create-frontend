import { describe, expect } from 'vitest';
import { UserProfile as Profile } from 'oidc-client-ts';

import { store } from '../../setup/store';
import { accessTokenStored, getAccessToken, getIdToken, idTokenStored } from '../tokenSlice';

describe('configuration/tokenHandling/tokenSlice', () => {
    it('should store the access token', () => {
        const dummyAccessToken = 'dummy';

        store.dispatch(accessTokenStored(dummyAccessToken));

        expect(getAccessToken(store.getState())).toEqual(dummyAccessToken);
    });

    it('should store the id_token', () => {
        const dummyIdToken: Profile = {
            iss: 'Issuer Identifier',
            sub: 'Subject identifier',
            aud: 'Audience(s): client_id',
            exp: 10,
            iat: 5,
            azp: 'azp',
            account: 'account',
            given_name: 'given_name',
            family_name: 'family_name',
            name: 'name',
            locale: 'locale',
            email: 'email',
        };

        store.dispatch(idTokenStored(dummyIdToken));

        expect(getIdToken(store.getState())).toEqual(dummyIdToken);
    });
});
