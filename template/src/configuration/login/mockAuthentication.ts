import type { SessionRenewedResult } from '.';
import { config } from '../../config';

// enables mocking of authentication in non-production
export const shouldMockAuthentication = () => import.meta.env.MODE !== 'production' && config.login.mockAuthorization;

export const mockSession: SessionRenewedResult = {
    accessToken: 'valid-mocked-oauth-bogus-token',
    idToken: 'id_token',
    locale: config.login.mockLocale ?? 'en-GB',
    profile: {
        sub: 'prod-rio-users:mock-user',
        azp: 'test-client',
        account: 'mockaccount',
        tenant: config.login.mockTenant,
        givenName: 'Test',
        familyName: 'Client',
        name: 'Test Client',
        locale: config.login.mockLocale,
        email: 'test@example.com',
        iss: 'Issuer Identifier',
        aud: 'Audience(s): client_id',
        exp: 10,
        iat: 5,
    },
};
