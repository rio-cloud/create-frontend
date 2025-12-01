import { screen } from '@testing-library/react';

import MockComponent from '../../__test__/MockComponent';
import { testRender } from '../../__test__/testUtils';
import type { RootState } from '../../configuration/setup/store';
import messagesDE from '../../features/translations/de-DE.json';
import AppLayout from '../AppLayout';

vi.mock('iframe-resizer-react', () => ({
    // @ts-expect-error Several components on this level are using the iframe-resizer
    default: props => <MockComponent name='IframeResizer' data={props} />,
}));

describe('Test AppLayout', () => {
    it('Application layout is rendered', async () => {
        testRender(<AppLayout />);
        expect(await screen.findByTestId('app-layout')).toBeInTheDocument();
    });

    it('Application layout renders with a preloaded store', async () => {
        // Define the preloaded state for the test
        const preloadedState: Partial<RootState> = {
            lang: {
                // This initial state gets changed when loading the app due to local
                // lang settings VITE_LOGIN_MOCK_LOCALE in the .env file
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
