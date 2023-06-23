import { config } from '../../config';
import { trace } from './trace';
import * as storage from '../login/storage';
import { reportErrorToSentry } from './sentry';
import { UserManager } from 'oidc-client-ts';

const saveCurrentRoute = () => {
    const initialRoute = [window.location.hash, window.location.search].join('').replace(/^#\/?/u, '');
    storage.routeStorage.saveRoute(initialRoute);
    trace('saving initial route', initialRoute);
};

export const attemptInitialSignIn = async (userManager: UserManager) => {
    const isFreshRedirect = window.location.href.includes('redirected');

    try {
        const user = await userManager.signinSilent();
        const initialRoute = storage.routeStorage.getRoute();

        trace('initialRoute lookup', initialRoute);

        if (initialRoute && isFreshRedirect) {
            trace(`Go to location "/${initialRoute}"`);
            window.location.replace(`#/${initialRoute}`);
        }

        storage.routeStorage.discardRoute();
        return await Promise.resolve(user);
    } catch (error) {
        trace('oidc.signinSilent failed, trying page redirect...', error);

        if (config.login.preventRedirect) {
            // eslint-disable-next-line no-console
            console.warn('[feature/login] redirect prevented due to config. Error was', error);
        } else if (isFreshRedirect) {
            trace('oidc.signinSilent.error', 'redirect prevented due to supsicious signin error', error);
            storage.routeStorage.discardRoute();
            reportErrorToSentry(error);
        } else {
            saveCurrentRoute();
            userManager.signinRedirect();
        }

        trace('auth problem?', error);
        throw new Error('Need to sign in');
    }
};
