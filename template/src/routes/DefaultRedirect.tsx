import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DEFAULT_ROUTE, routes } from './Router';

const isUnknownRoute = (routeNames: string[], pathname: string): boolean =>
    !routes.some((route) => pathname.startsWith(route));

const DefaultRedirect = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isUnknownRoute(routes, pathname)) {
            navigate(DEFAULT_ROUTE);
        }
    }, [pathname]);

    return null;
};

export default DefaultRedirect;
