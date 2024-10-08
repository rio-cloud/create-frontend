import { render, type RenderOptions } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import type { ReactElement, ReactNode } from 'react';
import type { Store } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';

import { store as defaultStore } from '../configuration/setup/store';
import messages from '../features/translations/en-GB.json';

const getTestRouter = (children: ReactNode) => {
    const routes = [{ path: '/', element: children }];

    return createMemoryRouter(routes, {
        initialEntries: ['/'],
        initialIndex: 1,
    });
};

const createWrapper = (children: ReactNode, store?: Store) => {
    const WrapperComponent = ({ children }: { children: ReactNode }) => {
        const content = (
            <IntlProvider locale='en-GB' messages={messages}>
                <RouterProvider router={getTestRouter(children)} />
            </IntlProvider>
        );
        return store ? <Provider store={store}>{content}</Provider> : content;
    };
    return WrapperComponent;
};

export const renderTest = (element: ReactElement, renderOptions?: RenderOptions) => {
    const user = userEvent.setup();
    const defaultOptions: RenderOptions = { wrapper: createWrapper(element) };

    return { ...render(element, { ...defaultOptions, ...renderOptions }), user };
};

export const renderWithStore = (element: ReactElement, store: Store = defaultStore, renderOptions?: RenderOptions) => {
    const user = userEvent.setup();
    const defaultOptions: RenderOptions = { wrapper: createWrapper(element) };

    return { ...render(element, { ...defaultOptions, ...renderOptions }), user };
};
