import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../configuration/setup/store';
import { useAppSelector } from '../configuration/setup/hooks';

export type AppState = {
    sessionExpiredAcknowledged: boolean;
};

const initialState: AppState = {
    sessionExpiredAcknowledged: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        hideSessionExpiredDialog: state => {
            state.sessionExpiredAcknowledged = true;
        },
    },
});

export const { hideSessionExpiredDialog } = appSlice.actions;

export const getSessionExpiredAcknowledged = (state: RootState) => state.app.sessionExpiredAcknowledged;

export const useSessionExpiredAcknowledged = () => useAppSelector(getSessionExpiredAcknowledged);

export default appSlice.reducer;
