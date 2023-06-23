import { createSlice } from '@reduxjs/toolkit';
import { config, ConfigState } from '../../config';

import type { RootState } from '../../configuration/setup/store';

const initialState: ConfigState = config;

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {},
});

export const getConfig = (state: RootState) => state.config;

export default configSlice.reducer;
