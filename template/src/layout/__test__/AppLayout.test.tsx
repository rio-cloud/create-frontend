import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { HashRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import AppLayout from '../AppLayout';
import messagesEN from '../../features/translations/en-GB.json';
import { getDisplayMessages, getLocale } from '../../configuration/lang/langSlice';
import { isUserSessionExpired } from '../../configuration/login/loginSlice';
import { getSessionExpiredAcknowledged } from '../../data/appSlice';

vi.mock('react-redux', () => ({
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
}));

const mockSelectors = (selector: any, mockStore: any = {}) => {
    if (selector === getLocale) {
        return 'de-DE';
    } else if (selector === getDisplayMessages) {
        return messagesEN;
    } else if (selector === isUserSessionExpired) {
        return false;
    } else if (selector === getSessionExpiredAcknowledged) {
        return false;
    }
    return selector(mockStore);
};

describe('Test AppLayout', () => {
    const useSelectorMock = reactRedux.useSelector as any;
    const useDispatchMock = reactRedux.useDispatch as any;

    beforeEach(() => {
        useDispatchMock.mockImplementation(() => () => {});
        useSelectorMock.mockImplementation((selector: any) => mockSelectors(selector));
    });

    afterEach(() => {
        useDispatchMock.mockClear();
        useSelectorMock.mockClear();
    });

    test('Application layout is rendered', async () => {
        const { findByTestId } = renderWithRouter(<AppLayout />);

        await waitFor(async () => {
            const layout = await findByTestId('app-layout');
            expect(layout).toBeInTheDocument();
        });
    });
});

const renderWithRouter = (component: JSX.Element) => {
    return render(<HashRouter>{component}</HashRouter>);
};
