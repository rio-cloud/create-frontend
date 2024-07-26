import { useNavigate } from 'react-router-dom';
import ErrorState from '@rio-cloud/rio-uikit/ErrorState';

import { routes } from '../routes/routes';
import { FormattedMessage } from 'react-intl';

const RoutingErrorPage = () => {
    const navigate = useNavigate();

    return (
        <ErrorState
            headline={<FormattedMessage id="intl-msg:common-message.error.generic.headline" />}
            message={<FormattedMessage id="intl-msg:common-message.error.generic.message" />}
            buttons={[
                {
                    text: <FormattedMessage id="intl-msg:starterTemplate.reloadPage" />,
                    onClick: () => navigate(routes.DEFAULT),
                    className: 'btn-primary',
                },
            ]}
        >
            <FormattedMessage id="intl-msg:common-message.error.generic.retryOrSupport" />
        </ErrorState>
    );
};

export default RoutingErrorPage;
