import { createRoot } from 'react-dom/client';
import { IntlProvider } from 'react-intl';

import messagesEN from '../../features/translations/en-GB.json';
import Intro from '../Intro';

it('renders without crashing', () => {
    const container = document.createElement('div');
    const root = createRoot(container);

    root.render(
        <IntlProvider locale='en' messages={messagesEN}>
            <Intro />
        </IntlProvider>
    );

    root.unmount();
});
