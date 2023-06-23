import { Store } from '@reduxjs/toolkit';
import { Exception } from '@sentry/types';
import { reportErrorToSentry } from '../setup/sentry';
import getOr from 'lodash/fp/getOr';

import { displayMessagesFetched, localeChanged } from './langSlice';
import { DEFAULT_LOCALE, getSupportedLocale as defaultGetSupportedLocale } from './lang';
import { trace } from '../setup/trace';
import { config } from '../../config';

const sendError = (exception: Exception) => {
    reportErrorToSentry(exception, {
        tags: {
            module: config.sentryModuleName,
        },
    });
};

// Webpack is weird sometimes, maybe it's Babel, who knows...
const normalizeDynamicImport = (imported: any) => getOr(imported, 'default', imported);

export const importDisplayMessages = (locale: string) =>
    import(`../../features/translations/${locale}.json`).then(normalizeDynamicImport).catch((error) => {
        sendError(error);
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
        } catch (error: any) {
            console.error(`Display messages for "${supportedLocale}" could not be fetched.`, error);
            sendError(error);
            store.dispatch(localeChanged(DEFAULT_LOCALE));
        }
    };
