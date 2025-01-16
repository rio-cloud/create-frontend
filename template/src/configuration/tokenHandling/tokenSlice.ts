import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../setup/store';
import { accessToken } from './accessToken';

export const TENANT_RIO_EU_PROD = 'rio-eu.prod';
export const TENANT_RIO_EU_TEST = 'rio-eu.test';
export const TENANT_RIO_BRAZIL_PROD = 'rio-brazil.prod';
export const TENANT_RIO_SOUTHKOREA_PROD = 'rio-southkorea.prod';

export type AccessToken = string | undefined | null;

export type TokenHandlingState = {
    accessToken: AccessToken;
    idToken: string | null;
};

const initialState: TokenHandlingState = {
    accessToken: accessToken.getAccessToken(),
    idToken: null,
};

const tokenSlice = createSlice({
    name: 'tokenHandling',
    initialState,
    reducers: {
        accessTokenStored: (state, action: PayloadAction<AccessToken>) => {
            state.accessToken = action.payload;
        },
        idTokenStored: (state, action: PayloadAction<string | null>) => {
            state.idToken = action.payload;
        },
    },
});

export const { accessTokenStored, idTokenStored } = tokenSlice.actions;

export const getAccessToken = (state: RootState) => state.tokenHandling.accessToken ?? 'NO_ACCESS_TOKEN_AVAILABLE';
export const getIdToken = (state: RootState) => state.tokenHandling.idToken;

export default tokenSlice.reducer;
