import { render as libRender, type RenderOptions } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import type { ReactElement, ReactNode } from 'react';
import type { Store } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';

import { store as defaultStore } from '../configuration/setup/store';
import messages from '../features/translations/en-GB.json';

export const render = (element: ReactElement, renderOptions?: RenderOptions) => {
    const user = userEvent.setup();

    const defaultWrapper = ({ children }: { children: ReactNode }) => {
        const routes = [
            {
                path: '/',
                element: children,
            },
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ['/'],
            initialIndex: 1,
        });

        return (
            <IntlProvider locale='en-GB' messages={messages}>
                <RouterProvider router={router} />
            </IntlProvider>
        );
    };

    const defaultOptions: RenderOptions = {
        wrapper: defaultWrapper,
    };

    return {
        ...libRender(element, { ...defaultOptions, ...renderOptions }),
        user,
    };
};

export const renderWithStore = (element: ReactElement, store: Store = defaultStore, renderOptions?: RenderOptions) => {
    const user = userEvent.setup();

    const defaultWrapper = ({ children }: { children: ReactNode }) => {
        const routes = [
            {
                path: '/',
                element: children,
            },
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ['/'],
            initialIndex: 1,
        });

        return (
            <Provider store={store}>
                <IntlProvider locale='en-GB' messages={messages}>
                    <RouterProvider router={router} />
                </IntlProvider>
            </Provider>
        );
    };

    const defaultOptions: RenderOptions = {
        wrapper: defaultWrapper,
    };

    return {
        ...libRender(element, { ...defaultOptions, ...renderOptions }),
        user,
    };
};
