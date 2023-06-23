import { lazy } from 'react';
import { createHashRouter, createRoutesFromElements, Route } from 'react-router-dom';

import { ErrorBoundary } from '../components/ErrorBoundary';
import SuspendedWithSpinner from '../components/SuspendedWithSpinner';
import AppLayout from '../layout/AppLayout';

// Lazy load pages for better performance and automatically split the bundle accordingly
const Intro = lazy(() => import('../pages/Intro'));
const More = lazy(() => import('../pages/More'));
const UserSidebarLoader = lazy(() => import('../features/users/userSidebar/UserSidebarLoader'));

export const DEFAULT_ROUTE = '/intro';
export const ROUTE_MORE = '/more';

export const routes = [DEFAULT_ROUTE, ROUTE_MORE];

export const router = createHashRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route
                path={DEFAULT_ROUTE}
                errorElement={<ErrorBoundary />}
                element={
                    <SuspendedWithSpinner>
                        <Intro />
                    </SuspendedWithSpinner>
                }
            />
            <Route
                path={ROUTE_MORE}
                errorElement={<ErrorBoundary />}
                element={
                    <SuspendedWithSpinner>
                        <More />
                    </SuspendedWithSpinner>
                }
            >
                <Route
                    path=":userId"
                    element={
                        <SuspendedWithSpinner>
                            <UserSidebarLoader />
                        </SuspendedWithSpinner>
                    }
                />
            </Route>
        </Route>
    )
);
