import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { ErrorBoundary } from './components/ErrorBoundary';
import ErrorFallback from './components/ErrorFallback';
import { config } from './config';
import { getUserSessionHooks } from './configuration';
import { DEFAULT_LOCALE, extractLanguage } from './configuration/lang/lang';
import { useDisplayMessages, useLocale } from './configuration/lang/langSlice';
import { ensureUserIsLoggedIn } from './configuration/login';
import { store } from './configuration/setup/store';
import { router } from './routes/Router';

const App = () => {
    const userLocale = useLocale();
    const displayMessages = useDisplayMessages();

    // We want the `<html lang>` attribute to be in sync with the language currently displayed
    useEffect(() => {
        const language = extractLanguage(userLocale);
        const htmlElement = document.documentElement;
        if (!!language && htmlElement.getAttribute('lang') !== language) {
            htmlElement.setAttribute('lang', language);
        }
    }, [userLocale]);

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
const isProdPreview = import.meta.env.VITE_PRODUCTION_PREVIEW;
if ((isDev && config.enableMockServer) || isProdPreview) {
    await import('../mocks/browser').then(({ startWorker }) => startWorker());
}

await ensureUserIsLoggedIn(renderApplication, getUserSessionHooks());
