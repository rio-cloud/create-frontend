import { createSlice } from '@reduxjs/toolkit';

import { type ConfigState, config } from '../../config';
import type { RootState } from './store';

const initialState: ConfigState = config;

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {},
});

export const getConfig = (state: RootState) => state.config;

export default configSlice.reducer;
