import { accessToken } from './accessToken';
import { AccessToken } from './tokenSlice';

export const prepareHeaders = (headers: Headers) => {
    const token = accessToken.getAccessToken() as AccessToken;
    if (token) {
        headers.set('authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json');
    }
    return headers;
};
