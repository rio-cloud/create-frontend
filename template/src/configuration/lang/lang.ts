import defaultTo from 'lodash/fp/defaultTo';
import flow from 'lodash/fp/flow';
import head from 'lodash/fp/head';
import split from 'lodash/fp/split';
import has from 'lodash/fp/has';

export const DEFAULT_LOCALE = 'en-GB';

type LocaleMap = Record<string, string>;

export const supportedLocaleMap: LocaleMap = {
    de: 'de-DE',
    'de-DE': 'de-DE',
    en: 'en-GB',
    'en-GB': 'en-GB',
};

export const extractLanguage = flow(defaultTo(DEFAULT_LOCALE), split('-'), head);

export const DEFAULT_LANG = extractLanguage(DEFAULT_LOCALE);

export const getSupportedLocale = (preferredLocale: string): string =>
    has(preferredLocale, supportedLocaleMap) ? supportedLocaleMap[preferredLocale] : DEFAULT_LOCALE;
