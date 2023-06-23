import { Log, UserManager } from 'oidc-client-ts';
import { config } from '../../config';

export const handleLoginRedirect = () => {
    const runsInIframe = window && window.parent && window.parent !== window;

    if (runsInIframe) {
        // Silent redirect within an <iframe>
        Log.setLogger(console);
        Log.setLevel(Log.INFO);

        // This will propagate the received information provided via
        // query parameters to the parent frame
        new UserManager({
            authority: `${config.login.authority}`,
            client_id: `${config.login.clientId}`,
            redirect_uri: `${config.login.redirectUri}`,
        }).signinSilentCallback();
    } else {
        window.location.replace(`${window.location.origin}#/redirected`);
    }
};
