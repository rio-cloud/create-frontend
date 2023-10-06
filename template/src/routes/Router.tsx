import { createHashRouter, createRoutesFromElements, Route } from 'react-router-dom';

import { ErrorBoundary } from '../components/ErrorBoundary';
import AppLayout from '../layout/AppLayout';
import { suspendPageLoad } from './suspendPageLoad';

// Lazy load pages for better performance and automatically split the bundle accordingly
const Intro = suspendPageLoad(() => import('../pages/Intro'));
const More = suspendPageLoad(() => import('../pages/More'));
const UserSidebarLoader = suspendPageLoad(() => import('../features/users/userSidebar/UserSidebarLoader'));

export const DEFAULT_ROUTE = '/intro';
export const ROUTE_MORE = '/more';

export const routes = [DEFAULT_ROUTE, ROUTE_MORE];

export const router = createHashRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route path={DEFAULT_ROUTE} errorElement={<ErrorBoundary />} element={<Intro />} />
            <Route path={ROUTE_MORE} errorElement={<ErrorBoundary />} element={<More />}>
                <Route path=":userId" element={<UserSidebarLoader />} />
            </Route>
        </Route>
    )
);
