import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { messages } from '../../__test__/testUtils';
import Intro from '../Intro';

it('renders without crashing', () => {
    render(
        <IntlProvider locale='en' messages={messages}>
            <Intro />
        </IntlProvider>
    );
});
