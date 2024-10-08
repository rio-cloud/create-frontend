import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import ApplicationLayout from '@rio-cloud/rio-uikit/ApplicationLayout';
import NotificationsContainer from '@rio-cloud/rio-uikit/NotificationsContainer';

import RouteUpdater from '../routes/RouteUpdater';
import SessionExpiredInfo from '../components/SessionExpiredInfo';
import AppHeader from '../features/header/AppHeader';
import { AppContext } from './AppContext';

import './App.css';

const AppLayout = () => {
    const sidebarRef = useRef<HTMLDivElement>(null);

    return (
        <AppContext.Provider value={{ sidebarRef }}>
            <ApplicationLayout data-testid='app-layout'>
                <ApplicationLayout.Header>
                    <AppHeader />
                </ApplicationLayout.Header>
                <ApplicationLayout.Sidebar className='right' ref={sidebarRef} />
                <ApplicationLayout.Body>
                    <NotificationsContainer />
                    <SessionExpiredInfo />
                    <Outlet />
                    <RouteUpdater />
                </ApplicationLayout.Body>
            </ApplicationLayout>
        </AppContext.Provider>
    );
};

export default AppLayout;
