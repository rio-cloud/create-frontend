import { createContext, type RefObject } from 'react';

export type AppContextType = { sidebarRef: RefObject<HTMLDivElement> | null };

export const AppContext = createContext<AppContextType>({ sidebarRef: null });
