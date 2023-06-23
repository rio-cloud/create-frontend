import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../configuration/setup/store';

export interface AppState {
    sessionExpiredAcknowledged: boolean;
}

const initialState: AppState = {
    sessionExpiredAcknowledged: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        hideSessionExpiredDialog: (state) => {
            state.sessionExpiredAcknowledged = true;
        },
    },
});

export const { hideSessionExpiredDialog } = appSlice.actions;

export const getSessionExpiredAcknowledged = (state: RootState) => state.app.sessionExpiredAcknowledged;

export default appSlice.reducer;
