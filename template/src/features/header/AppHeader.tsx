import { FormattedMessage } from 'react-intl';
import { Link, NavLink } from 'react-router-dom';
import { DefaultUserMenu } from '@rio-cloud/rio-user-menu-component';
import { RioNotifications } from '@rio-cloud/rio-notifications-component';
import ApplicationHeader from '@rio-cloud/rio-uikit/ApplicationHeader';
import IframeResizer from 'iframe-resizer-react';

import { config } from '../../config';
import ServiceInfo from './ServiceInfo';
import { routes } from '../../routes/routes';

const navItems = [
    {
        key: 'intro',
        route: (
            <NavLink to={routes.DEFAULT}>
                <FormattedMessage id="intl-msg:starterTemplate.sublink.intro" />
            </NavLink>
        ),
    },
    {
        key: 'more',
        route: (
            <NavLink to={routes.MORE}>
                <FormattedMessage id="intl-msg:starterTemplate.sublink.more" />
            </NavLink>
        ),
    },
];

const AppHeader = () => {
    const environment = import.meta.env.PROD ? 'production' : 'local';

    const serviceInfoItem = <ServiceInfo />;
    const notifications = <RioNotifications />;
    const userMenuItem = <DefaultUserMenu environment={environment} />;

    return (
        <ApplicationHeader
            label={<FormattedMessage id="intl-msg:starterTemplate.moduleName" />}
            appNavigator={<IframeResizer className="iFrameResizer" src={config.backend.MENU_SERVICE} />}
            homeRoute={<Link to={config.homeRoute || ''} />}
            navItems={navItems}
            actionBarItems={[serviceInfoItem, notifications, userMenuItem]}
        />
    );
};

export default AppHeader;
