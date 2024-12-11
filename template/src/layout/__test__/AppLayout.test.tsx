import { screen } from '@testing-library/react';

import { silenceConsole, testRender } from '../../__test__/testUtils';
import AppLayout from '../AppLayout';

describe('Test AppLayout', () => {
    test('Application layout is rendered', async () => {
        silenceConsole();
        testRender(<AppLayout />);
        expect(await screen.findByTestId('app-layout')).toBeInTheDocument();
    });
});
