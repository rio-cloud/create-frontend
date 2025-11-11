import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import appReducer from '../../data/appSlice';
import userReducer from '../../features/users/userSlice';
import { userApi } from '../../services/userApi';
import langReducer from '../lang/langSlice';
import loginReducer from '../login/loginSlice';
import tokenReducer from '../tokenHandling/tokenSlice';
import configReducer from './configSlice';

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
    config: configReducer,
    lang: langReducer,
    app: appReducer,
    user: userReducer,
    login: loginReducer,
    tokenHandling: tokenReducer,

    // Add the generated reducer as a specific top-level slice
    [userApi.reducerPath]: userApi.reducer,
});

export const getStore = (preloadedState?: Partial<RootState>) =>
    configureStore({
        reducer: rootReducer,
        preloadedState,

        // Adding the api middleware enables caching, invalidation, polling,
        // and other useful features of `rtk-query`.
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userApi.middleware),
    });

export const store = getStore();

// Infer the store, state and dispatch types from the store instance
export type RootState = ReturnType<typeof rootReducer>;
export type RootStore = ReturnType<typeof getStore>;
export type AppDispatch = RootStore['dispatch'];

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
