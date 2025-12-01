import { createRoot } from 'react-dom/client';
import { IntlProvider } from 'react-intl';

import { messages } from '../../__test__/testUtils';
import Intro from '../Intro';

it('renders without crashing', () => {
    const container = document.createElement('div');
    const root = createRoot(container);

    root.render(
        <IntlProvider locale='en' messages={messages}>
            <Intro />
        </IntlProvider>
    );

    root.unmount();
});
