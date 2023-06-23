import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../configuration/setup/store';

export interface UserState {
    selectedUserId?: string;
}

const initialState: UserState = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userSelected: (state, action: PayloadAction<string | undefined>) => {
            state.selectedUserId = action.payload;
        },
    },
});

export const { userSelected } = userSlice.actions;

export const getSelectedUserId = (state: RootState) => state.user.selectedUserId;

export default userSlice.reducer;
