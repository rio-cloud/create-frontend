import { useRouteError } from 'react-router-dom';

import ErrorFallback from './ErrorFallback';

const RouteErrorFallback = () => {
    const error = useRouteError() as Error;
    return <ErrorFallback errorMessage={error.message} />;
};

export default RouteErrorFallback;
