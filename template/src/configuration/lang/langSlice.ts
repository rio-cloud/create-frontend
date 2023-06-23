import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../configuration/setup/store';

import messagesEN from '../../features/translations/en-GB.json';
import { DEFAULT_LOCALE, getSupportedLocale } from './lang';

export type DisplayMessages = Record<string, string>;

interface CombinedMessages {
    [key: string]: DisplayMessages;
}

export interface LangState {
    allMessages: CombinedMessages;
    displayMessages: DisplayMessages | undefined;
    displayLocale: string | undefined;
}

interface MessagesPayload {
    locale: string;
    displayMessages: DisplayMessages;
}

const defaultMessages = {
    [DEFAULT_LOCALE]: messagesEN,
};

const initialState: LangState = {
    allMessages: defaultMessages,
    displayMessages: undefined,
    displayLocale: undefined,
};

const langSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        localeChanged: (state, action: PayloadAction<string>) => {
            const preferredLocale = action.payload;
            const displayLocale = getSupportedLocale(preferredLocale);

            state.displayLocale = displayLocale;
            state.displayMessages = state.allMessages[displayLocale];
        },
        displayMessagesFetched: (state, action: PayloadAction<MessagesPayload>) => {
            const { locale, displayMessages } = action.payload;

            state.allMessages = {
                ...state.allMessages,
                [locale]: displayMessages,
            };
            state.displayMessages = displayMessages;
            state.displayLocale = locale;
        },
    },
});

export const { localeChanged, displayMessagesFetched } = langSlice.actions;

export const getLocale = (state: RootState) => state.lang.displayLocale;
export const getDisplayMessages = (state: RootState) => state.lang.displayMessages;

export default langSlice.reducer;
