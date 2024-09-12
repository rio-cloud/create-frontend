import { Navigate } from 'react-router';

import { routes } from './routes';

export const RoutingErrorElement = () => <Navigate to={routes.ERROR} />;
