import { reportErrorToSentry } from './sentry';
import { trace } from './trace';

export const runInBackground = <T>(promiseOrAction: Promise<T> | (() => Promise<T>), traceMsg?: string): void => {
    const promise = typeof promiseOrAction === 'function' ? promiseOrAction() : promiseOrAction;
    promise.catch(error => {
        trace(traceMsg ?? 'An error happened in an asynchronous background task', error);
        reportErrorToSentry(error);
    });
};
