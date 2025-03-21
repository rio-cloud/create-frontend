import { screen } from '@testing-library/react';

import { silenceConsole, testRender } from '../../__test__/testUtils';
import AppLayout from '../AppLayout';
import type { RootState } from '../../configuration/setup/store';

import messagesDE from '../../features/translations/de-DE.json';

describe('Test AppLayout', () => {
    test('Application layout is rendered', async () => {
        silenceConsole();
        testRender(<AppLayout />);
        expect(await screen.findByTestId('app-layout')).toBeInTheDocument();
    });

    test('Application layout renders with a preloaded store', async () => {
        silenceConsole();

        // Define the preloaded state for the test
        const preloadedState: Partial<RootState> = {
            lang: {
                // gets changed when loading the app due to local lang settings VITE_LOGIN_MOCK_LOCALE in the .env file
                displayLocale: 'de-DE',
                allMessages: { 'de-DE': messagesDE },
                displayMessages: messagesDE,
            },
        };

        testRender(<AppLayout />, preloadedState);

        expect(await screen.findByTestId('app-layout')).toBeInTheDocument();
        expect(screen.getByText('Introduction')).toBeInTheDocument();
    });
});
