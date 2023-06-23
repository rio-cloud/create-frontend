/* eslint-disable no-undef */
import * as Sentry from '@sentry/browser';
import { config } from '../../config';

const UNDEFINED_TOKEN = '<YOUR SENTRY DSN>';

if (import.meta.env.PROD) {
    // version and environment are defined in the webpack.define plugin
    const release = config.serviceVersion;
    const environment = config.serviceEnvironment;
    const dsn = config.sentryToken;

    const hasToken = !dsn?.startsWith(UNDEFINED_TOKEN);

    if (hasToken) {
        Sentry.init({
            dsn,
            environment,
            release,
        });
    }
}

export const reportErrorToSentry = (...args: [any, any?]) => {
    Sentry.captureException(...args);
};
