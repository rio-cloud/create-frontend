import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import configReducer from './configSlice';
import loginReducer from '../login/loginSlice';
import langReducer from '../lang/langSlice';
import tokenReducer from '../tokenHandling/tokenSlice';
import appReducer from '../../data/appSlice';
import userReducer from '../../features/users/userSlice';
import { userApi } from '../../services/userApi';

export const getStore = () =>
    configureStore({
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
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userApi.middleware),
    });

export const store = getStore();

// Infer the store, state and dispatch types from the store instance
export type RootStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
