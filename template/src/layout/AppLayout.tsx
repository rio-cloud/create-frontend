import { IntlProvider } from 'react-intl';
import { Outlet } from 'react-router-dom';
import { SessionExpiredDialog } from '@rio-cloud/rio-session-expired-info';
import ApplicationLayout from '@rio-cloud/rio-uikit/ApplicationLayout';
import NotificationsContainer from '@rio-cloud/rio-uikit/NotificationsContainer';

import { DEFAULT_LOCALE } from '../configuration/lang/lang';
import { isUserSessionExpired } from '../configuration/login/loginSlice';
import { useAppDispatch, useAppSelector } from '../configuration/setup/hooks';
import { getDisplayMessages, getLocale } from '../configuration/lang/langSlice';
import DefaultRedirect from '../routes/DefaultRedirect';
import RouteUpdater from '../routes/RouteUpdater';
import { getSessionExpiredAcknowledged, hideSessionExpiredDialog } from '../data/appSlice';
import AppHeader from '../features/header/AppHeader';

import './App.css';
import { useRef } from 'react';
import { AppContext } from './AppContext';

const AppLayout = () => {
    const dispatch = useAppDispatch();

    const sidebarRef = useRef();

    const userLocale = useAppSelector(getLocale);
    const displayMessages = useAppSelector(getDisplayMessages);
    const isSessionExpired = useAppSelector(isUserSessionExpired);
    const sessionExpiredAcknowledged = useAppSelector(getSessionExpiredAcknowledged);

    if (!(displayMessages && userLocale)) {
        return null;
    }

    const handleSessionExpiredDialogClose = () => dispatch(hideSessionExpiredDialog);
    const showSessionExpired = isSessionExpired && !sessionExpiredAcknowledged;

    return (
        <IntlProvider defaultLocale={DEFAULT_LOCALE} key={userLocale} locale={userLocale} messages={displayMessages}>
            <AppContext.Provider value={{ sidebarRef }}>
                <ApplicationLayout data-testid={'app-layout'}>
                    <ApplicationLayout.Header>
                        <AppHeader />
                    </ApplicationLayout.Header>
                    <ApplicationLayout.Sidebar className="right" ref={sidebarRef} />
                    <ApplicationLayout.Body>
                        <NotificationsContainer />
                        <SessionExpiredDialog
                            locale={userLocale}
                            onClose={handleSessionExpiredDialogClose}
                            show={showSessionExpired}
                        />
                        <Outlet />
                        <RouteUpdater />
                        <DefaultRedirect />
                    </ApplicationLayout.Body>
                </ApplicationLayout>
            </AppContext.Provider>
        </IntlProvider>
    );
};

export default AppLayout;
