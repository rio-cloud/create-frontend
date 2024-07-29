import ErrorState from '@rio-cloud/rio-uikit/ErrorState';
import { FormattedMessage } from 'react-intl';

const AppErrorPage = () => (
    <ErrorState
        outerClassName="margin-top-20"
        headline={<FormattedMessage id="intl-msg:common-message.error.generic.headline" />}
        message={<FormattedMessage id="intl-msg:common-message.error.generic.message" />}
    />
);

export default AppErrorPage;
