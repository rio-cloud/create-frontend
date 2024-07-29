import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { config } from './config';
import { main } from './configuration';
import { store } from './configuration/setup/store';
import { handleLoginRedirect } from './configuration/login/redirect';
import { ErrorBoundary } from './components/ErrorBoundary';
import { router } from './routes/Router';
import AppErrorPage from './pages/AppErrorPage';

const renderApplication = () => {
    createRoot(document.getElementById('root') as HTMLElement).render(
        <ErrorBoundary fallback={<AppErrorPage />}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </ErrorBoundary>
    );
};

const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
const isProdPreview = import.meta.env.VITE_PRODUCTION_PREVIEW;

if ((isDev && config.enableMockServer) || isProdPreview) {
    import('../mocks/browser').then(({ startWorker }) => startWorker()).then(() => main(renderApplication));
}

if (window.location.href.startsWith(config.login.redirectUri as string)) {
    handleLoginRedirect();
} else if (isProd && !isProdPreview) {
    main(renderApplication);
}
