import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../setup/store';

export interface UserProfile {
    sub?: string;
    azp?: string;
    account?: string;
    givenName?: string;
    familyName?: string;
    name?: string;
    locale?: string;
    email?: string;
}

export interface LoginState {
    hasUserSessionEverExpired: boolean;
    userProfile: UserProfile | null;
    userSessionExpired: boolean;
}

const initialState: LoginState = {
    hasUserSessionEverExpired: false,
    userProfile: null,
    userSessionExpired: false,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        userProfileObtained: (state, action: PayloadAction<UserProfile>) => {
            state.userProfile = action.payload;
        },
        userSessionExpired: (state) => {
            state.hasUserSessionEverExpired = true;
            state.userSessionExpired = true;
        },
        userSessionRenewed: (state) => {
            state.userSessionExpired = false;
        },
    },
});

export const { userProfileObtained, userSessionExpired, userSessionRenewed } = loginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getUserProfile = (state: RootState) => state.login.userProfile;
export const getUserAccount = (state: RootState) => state.login.userProfile?.account;

export const hasUserSessionEverExpired = (state: RootState) => state.login.hasUserSessionEverExpired;
export const isUserSessionExpired = (state: RootState) => state.login.userSessionExpired;

export default loginSlice.reducer;
