import * as Sentry from '@sentry/browser';
import type { Breadcrumb, ErrorEvent, EventHint } from '@sentry/core';

import { config } from '../../config';

export const reportErrorToSentry = (exception: unknown, hint?: Parameters<typeof Sentry.captureException>[1]) => {
    if (exception === undefined) {
        Sentry.captureMessage('reportErrorToSentry received undefined');
    } else {
        Sentry.captureException(exception, hint);
    }
};

export const addBreadcrumbToSentry = (breadcrumb: Breadcrumb) => {
    Sentry.addBreadcrumb(breadcrumb);
};

export const filterSentryEvent = (event: ErrorEvent, hint: EventHint): ErrorEvent | null => {
    if (
        isTypeError('Failed to fetch', hint.originalException) ||
        isTypeError('Load failed', hint.originalException) ||
        isTypeError('NetworkError', hint.originalException) ||
        isUnhandledRejectionOfNonObject(event)
    ) {
        // drop event
        return null;
    }

    return filterOAuthParameters(event);
};

const isTypeError = (errorMessagePrefix: string, error: unknown) =>
    (error instanceof Error && error.name === 'TypeError' && error.message.startsWith(errorMessagePrefix)) ||
    (typeof error === 'object' &&
        error !== null &&
        'error' in error &&
        typeof error.error === 'string' &&
        error.error.includes(`TypeError: ${errorMessagePrefix}`));

const isUnhandledRejectionOfNonObject = (event: Sentry.ErrorEvent): boolean => {
    /* Outlook link scanning can lead to rejected promises with string
     * error instead of a proper Error object. See also
     * https://github.com/getsentry/sentry-javascript/issues/3440 */
    const pattern = /Non-Error promise rejection captured with value: Object Not Found Matching Id/;
    if (event?.exception?.values?.length === 1) {
        const firstException = event.exception.values[0];
        return Boolean(
            firstException.type === 'UnhandledRejection' && firstException.value && pattern.test(firstException.value)
        );
    }

    return false;
};

const filterOAuthParameters = (event: ErrorEvent): ErrorEvent => {
    if (event.request?.url?.startsWith(config.login.redirectUri as string)) {
        // The event.request.url value was truncated by Sentry. Parsing the URL might fail due
        // to the truncation. Therefore, we use the real URL as a base. Due to the filtering
        // the resulting URL won't be very long. This has also the advantage that we see the
        // key of all request parameters in Sentry, which avoids confusion.
        event.request.url = filterQueryParameters(window.location.href, ['code', 'state', 'session_state']).href;
    }

    return event;
};

const filterQueryParameters = (url: string | URL, keysToFilter: string[]): URL => {
    const updatedURL = new URL(url);

    const parsedSearchParams = updatedURL.searchParams;
    for (const key of parsedSearchParams.keys()) {
        if (keysToFilter.includes(key)) {
            parsedSearchParams.set(key, '[Filtered by client]');
        }
    }
    updatedURL.search = parsedSearchParams.toString();

    return updatedURL;
};

if (import.meta.env.MODE === 'production') {
    const release = import.meta.env.VITE_COMMIT_HASH || import.meta.env.APP_VERSION;

    // should have been called before using it here
    // ideally before even rendering your React app
    Sentry.init({
        dsn: config.sentryToken,
        environment: 'production',
        release,
        beforeSend: filterSentryEvent,
    });
}
