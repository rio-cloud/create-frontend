import { DEFAULT_LANG, DEFAULT_LOCALE, extractLanguage, supportedLocaleMap } from '../lang';

describe('features/lang/lang', () => {
    it('should export the suitable default language', () => {
        expect(DEFAULT_LANG).toEqual('en');
    });

    it('should export the suitable default locale', () => {
        expect(DEFAULT_LOCALE).toEqual('en-GB');
    });

    it('should provide a map of the supported locales', () => {
        expect(supportedLocaleMap).toEqual({
            bg: 'bg-BG',
            'bg-BG': 'bg-BG',
            cs: 'cs-CZ',
            'cs-CZ': 'cs-CZ',
            da: 'da-DK',
            'da-DK': 'da-DK',
            de: 'de-DE',
            'de-DE': 'de-DE',
            el: 'el-GR',
            'el-GR': 'el-GR',
            en: 'en-GB',
            'en-GB': 'en-GB',
            et: 'et-EE',
            'et-EE': 'et-EE',
            fi: 'fi-FI',
            'fi-FI': 'fi-FI',
            fr: 'fr-FR',
            'fr-FR': 'fr-FR',
            hr: 'hr-HR',
            'hr-HR': 'hr-HR',
            hu: 'hu-HU',
            'hu-HU': 'hu-HU',
            it: 'it-IT',
            'it-IT': 'it-IT',
            ko: 'ko-KR',
            'ko-KR': 'ko-KR',
            lt: 'lt-LT',
            'lt-LT': 'lt-LT',
            lv: 'lv-LV',
            'lv-LV': 'lv-LV',
            nb: 'nb-NO',
            'nb-NO': 'nb-NO',
            nl: 'nl-NL',
            'nl-NL': 'nl-NL',
            pl: 'pl-PL',
            'pl-PL': 'pl-PL',
            pt: 'pt-PT',
            'pt-PT': 'pt-PT',
            'pt-PR': 'pt-PR',
            ro: 'ro-RO',
            'ro-RO': 'ro-RO',
            sk: 'sk-SK',
            'sk-SK': 'sk-SK',
            sl: 'sl-SL',
            'sl-SL': 'sl-SL',
            sv: 'sv-SE',
            'sv-SE': 'sv-SE',
        });
    });

    describe('the "extractLanguage" helper', () => {
        it('should return the language part of a locale', () => {
            expect(extractLanguage('fr-FR')).toEqual('fr');
        });

        it('should return the default language', () => {
            expect(extractLanguage(null)).toEqual('en');
            expect(extractLanguage(undefined)).toEqual('en');
        });

        it('should be ok when the structure does not match what is expected', () => {
            expect(extractLanguage('cs')).toEqual('cs');
        });
    });
});
