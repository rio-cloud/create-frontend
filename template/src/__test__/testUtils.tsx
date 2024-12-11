import { render as baseRender } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import type { PropsWithChildren, ReactElement } from 'react';

import { getStore, type RootStore } from '../configuration/setup/store';
import messagesEnGb from '../features/translations/en-GB.json';
import { DEFAULT_LOCALE } from '../configuration/lang/lang';
import { MemoryRouter } from 'react-router';

// first: re-export everything
export * from '@testing-library/react';
export const messages = messagesEnGb;

export const withRouterIntlAndStore =
    (store: RootStore, initialUrl: string) =>
    // eslint-disable-next-line react/display-name
    ({ children }: PropsWithChildren) => (
        <Provider store={store}>
            <MemoryRouter initialEntries={[initialUrl]}>
                <IntlProvider
                    defaultLocale={DEFAULT_LOCALE}
                    key={DEFAULT_LOCALE}
                    locale={DEFAULT_LOCALE}
                    messages={messagesEnGb}
                >
                    {children}
                </IntlProvider>
            </MemoryRouter>
        </Provider>
    );

export const testRender = (element: ReactElement, store: RootStore = getStore(), initialUrl = '/some/path') => {
    return baseRender(element, { wrapper: withRouterIntlAndStore(store, initialUrl) });
};

const consoleMethods = ['debug', 'error', 'info', 'log', 'warn'] as const;
type ConsoleMethod = (typeof consoleMethods)[number];

const noop = () => {};

export const silenceConsole = (methods = consoleMethods as unknown as ConsoleMethod[]) => {
    for (const method of methods) {
        vi.spyOn(console, method).mockImplementation(noop);
    }
};
