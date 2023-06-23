import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import configReducer from './configSlice';
import loginReducer from '../login/loginSlice';
import langReducer from '../lang/langSlice';
import tokenReducer from '../tokenHandling/tokenSlice';
import appReducer from '../../data/appSlice';
import userReducer from '../../features/users/userSlice';
import { userApi } from '../../services/userApi';

export const store = configureStore({
    reducer: {
        config: configReducer,
        lang: langReducer,
        app: appReducer,
        user: userReducer,
        login: loginReducer,
        tokenHandling: tokenReducer,

        // Add the generated reducer as a specific top-level slice
        [userApi.reducerPath]: userApi.reducer,
    },

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

// Infer the `RootState` and `RootDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
