import { createContext, useContext, type RefObject } from 'react';

export type AppContextType = { sidebarRef: RefObject<HTMLDivElement> | null };

export const AppContext = createContext<AppContextType>({ sidebarRef: null });

export const useAppContext = () => useContext(AppContext);
