import { describe, expect } from 'vitest';

import { store } from '../../setup/store';
import { DEFAULT_LOCALE } from '../lang';
import { displayMessagesFetched, getDisplayMessages, getLocale, localeChanged } from '../langSlice';
import messagesDE from '../../../features/translations/de-DE.json';
import messagesEN from '../../../features/translations/en-GB.json';

describe('configuration/lang/langSlice', () => {
    const LOCALE_DE = 'de-DE';

    it('localeChanged should set the locale if known and set the messages', () => {
        store.dispatch(displayMessagesFetched({ locale: LOCALE_DE, displayMessages: messagesDE }));
        store.dispatch(localeChanged(LOCALE_DE));

        expect(getLocale(store.getState())).toEqual(LOCALE_DE);
        expect(getDisplayMessages(store.getState())).toEqual(messagesDE);
    });

    it('localeChanged should set the locale if supported', () => {
        store.dispatch(displayMessagesFetched({ locale: LOCALE_DE, displayMessages: messagesDE }));
        store.dispatch(localeChanged('de'));

        expect(getLocale(store.getState())).toEqual(LOCALE_DE);
        expect(getDisplayMessages(store.getState())).toEqual(messagesDE);
    });

    it('localeChanged should set the locale to the default if unrecognized', () => {
        store.dispatch(localeChanged('invalid'));

        expect(getLocale(store.getState())).toEqual(DEFAULT_LOCALE);
        expect(getDisplayMessages(store.getState())).toEqual(messagesEN);
    });
});
