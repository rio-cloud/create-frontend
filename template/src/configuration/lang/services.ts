import { Store } from '@reduxjs/toolkit';
import { reportErrorToSentry } from '../setup/sentry';
import getOr from 'lodash/fp/getOr';

import { displayMessagesFetched, localeChanged } from './langSlice';
import { DEFAULT_LOCALE, getSupportedLocale as defaultGetSupportedLocale } from './lang';
import { trace } from '../setup/trace';

const normalizeDynamicImport = (imported: unknown) => getOr(imported, 'default', imported);

const importDisplayMessages = (locale: string) =>
    import(`../../features/translations/${locale}.json`).then(normalizeDynamicImport).catch((error: unknown) => {
        reportErrorToSentry(error);
        return error;
    });

export const configureFetchDisplayMessages =
    (store: Store, fetchDisplayMessages = importDisplayMessages, getSupportedLocale = defaultGetSupportedLocale) =>
    async (locale: string) => {
        if (!locale) {
            console.warn('No "locale" supplied when fetching display messages!');
            return Promise.reject();
        }

        const supportedLocale = getSupportedLocale(locale);

        try {
            const displayMessages = await fetchDisplayMessages(supportedLocale);
            trace(`Display messages fetched for "${supportedLocale}"`);
            store.dispatch(displayMessagesFetched({ locale: supportedLocale, displayMessages }));
        } catch (error: unknown) {
            console.error(`Display messages for "${supportedLocale}" could not be fetched.`, error);
            reportErrorToSentry(error);
            store.dispatch(localeChanged(DEFAULT_LOCALE));
        }
    };
