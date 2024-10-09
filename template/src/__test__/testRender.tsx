import userEvent from '@testing-library/user-event';
import { render, type RenderOptions } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import type { PropsWithChildren, ReactElement } from 'react';
import type { Store } from '@reduxjs/toolkit';

import { type RootState, store as defaultStore } from '../configuration/setup/store';
import messages from '../features/translations/en-GB.json';
import { DEFAULT_LOCALE } from '../configuration/lang/lang';

type TestWrapperProps = {
    store?: Store<RootState>;
};

const TestWrapper = ({ store, children }: PropsWithChildren<TestWrapperProps>) => {
    const routes = [{ path: '/', element: children }];
    const router = createMemoryRouter(routes, { initialEntries: ['/'], initialIndex: 1 });

    const content = (
        <IntlProvider locale={DEFAULT_LOCALE} messages={messages}>
            <RouterProvider router={router} />
        </IntlProvider>
    );
    return store ? <Provider store={store}>{content}</Provider> : content;
};

export const renderTest = (element: ReactElement, renderOptions?: RenderOptions) => {
    const user = userEvent.setup();
    const defaultOptions: RenderOptions = { wrapper: () => <TestWrapper>{element}</TestWrapper> };

    return { ...render(element, { ...defaultOptions, ...renderOptions }), user };
};

export const renderTestWithStore = (
    element: ReactElement,
    store: Store = defaultStore,
    renderOptions?: RenderOptions
) => {
    const user = userEvent.setup();
    const defaultOptions: RenderOptions = { wrapper: () => <TestWrapper store={store}>{element}</TestWrapper> };

    return { ...render(element, { ...defaultOptions, ...renderOptions }), user, store };
};
