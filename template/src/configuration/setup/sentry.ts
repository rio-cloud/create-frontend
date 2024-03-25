import * as Sentry from '@sentry/browser';

import { config } from '../../config';

if (import.meta.env.PROD) {
    const release = config.serviceVersion;
    const environment = config.serviceEnvironment;
    const dsn = config.sentryToken;

    Sentry.init({ dsn, environment, release });
}

export const reportErrorToSentry = import.meta.env.PROD
    ? (...args: [any, any?]) => Sentry.captureException(...args)
    : () => undefined;
