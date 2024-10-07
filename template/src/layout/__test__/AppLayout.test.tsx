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

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const mockSelectors = (selector: any, mockStore: any = {}) => {
    if (selector === getLocale) {
        return 'de-DE';
    }
    if (selector === getDisplayMessages) {
        return messagesEN;
    }
    if (selector === isUserSessionExpired) {
        return false;
    }
    if (selector === getSessionExpiredAcknowledged) {
        return false;
    }
    return selector(mockStore);
};

describe('Test AppLayout', () => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const useSelectorMock = reactRedux.useSelector as any;

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const useDispatchMock = reactRedux.useDispatch as any;

    beforeEach(() => {
        useDispatchMock.mockImplementation(() => () => {});
        useSelectorMock.mockImplementation((selector: unknown) => mockSelectors(selector));
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
