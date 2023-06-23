import { createContext } from 'react';

export type AppContextType = {
    sidebarRef: React.MutableRefObject<object> | undefined;
};

const defaultAppContext = {
    sidebarRef: undefined,
};

export const AppContext = createContext(defaultAppContext);
