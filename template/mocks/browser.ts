import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);

const isDefault = ({ pathname, href }: URL) =>
    pathname.startsWith('/node_modules/') ||
    pathname.startsWith('/src/') ||
    href.startsWith('https://cdn.rio.cloud') ||
    href.startsWith('https://uikit.developers.rio.cloud') ||
    href.includes('.hereapi.com/') ||
    href.includes('api.here.com/') ||
    href.includes('.configcat.com/') ||
    href.endsWith('iframeResizer.contentWindow.min.js');

export const startWorker = () =>
    worker.start({
        onUnhandledRequest: (request, print) => {
            const url = new URL(request.url);
            // turn off MSW warnings for specific routes
            if (isDefault(url) || url.href.startsWith('https://randomuser.me/')) {
                return;
            }
            print.warning();
        },
    });
