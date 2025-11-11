import { render as baseRender } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { DEFAULT_LOCALE } from '../configuration/lang/lang';
import { getStore, type RootState, type RootStore } from '../configuration/setup/store';
import messagesEnGb from '../features/translations/en-GB.json';

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

export const testRender = (element: ReactElement, preloadedState?: Partial<RootState>, initialUrl = '/some/path') => {
    const store = getStore(preloadedState);
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
