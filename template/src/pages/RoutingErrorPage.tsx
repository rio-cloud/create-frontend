import { useNavigate } from 'react-router-dom';
import ErrorState from '@rio-cloud/rio-uikit/ErrorState';

import { routes } from '../routes/routes';

const RoutingErrorPage = () => {
    const navigate = useNavigate();
    const emailAddress = `${import.meta.env.VITE_SUPPORT_ADDRESS}`;

    return (
        <ErrorState
            headline={'TODO ADD YOUR LOCALIZED ERROR MESSAGE HEADLINE'}
            message={'TODO ADD YOUR LOCALIZED ERROR MESSAGE BODY'}
            buttons={[
                {
                    text: 'TODO ADD YOUR LOCALIZED "reload page" TEXT',
                    onClick: () => navigate(routes.DEFAULT),
                    className: 'btn-primary',
                },
                {
                    text: 'TODO ADD YOUR LOCALIZED "contact support" TEXT',
                    href: `mailto:${emailAddress}`,
                    className: 'btn btn-outline btn-secondary',
                },
            ]}
        />
    );
};

export default RoutingErrorPage;
