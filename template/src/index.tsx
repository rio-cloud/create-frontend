import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { IntlProvider } from 'react-intl';

import { config } from './config';
import { main } from './configuration';
import { store } from './configuration/setup/store';
import { handleLoginRedirect } from './configuration/login/redirect';
import { ErrorBoundary } from './components/ErrorBoundary';
import { router } from './routes/Router';
import { useDisplayMessages, useLocale } from './configuration/lang/langSlice';
import { DEFAULT_LOCALE } from './configuration/lang/lang';
import ErrorFallback from './components/ErrorFallback';

const App = () => {
    const userLocale = useLocale();
    const displayMessages = useDisplayMessages();

    if (!(displayMessages && userLocale)) {
        return null;
    }

    return (
        <IntlProvider defaultLocale={DEFAULT_LOCALE} key={userLocale} locale={userLocale} messages={displayMessages}>
            <ErrorBoundary fallback={<ErrorFallback />}>
                <RouterProvider router={router} />
            </ErrorBoundary>
        </IntlProvider>
    );
};

const renderApplication = () => {
    createRoot(document.getElementById('root') as HTMLElement).render(
        <Provider store={store}>
            <App />
        </Provider>
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
