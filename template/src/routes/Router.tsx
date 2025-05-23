import { createHashRouter, createRoutesFromElements, Route } from 'react-router';
import { Navigate } from 'react-router';

import AppLayout from '../layout/AppLayout';
import RouteErrorFallback from '../components/RouteErrorFallback';
import { suspendPageLoad } from './suspendPageLoad';
import { routes } from './routes';

// Lazy load pages for better performance and automatically split the bundle accordingly
const Intro = suspendPageLoad(() => import('../pages/Intro'));
const More = suspendPageLoad(() => import('../pages/More'));
const UserSidebarLoader = suspendPageLoad(() => import('../features/users/userSidebar/UserSidebarLoader'));

const routesFromElements = createRoutesFromElements(
    <Route element={<AppLayout />} errorElement={<RouteErrorFallback />}>
        <Route path={routes.DEFAULT} element={<Intro />} />
        <Route path={routes.MORE} element={<More />}>
            <Route path=':userId' element={<UserSidebarLoader />} />
        </Route>

        <Route path='*' element={<Navigate to={routes.DEFAULT} />} />
    </Route>
);

export const router = createHashRouter(routesFromElements);
