import { SessionExpiredDialog } from '@rio-cloud/rio-session-expired-info';

import { DEFAULT_LOCALE } from '../configuration/lang/lang';
import { useLocale } from '../configuration/lang/langSlice';
import { useIsUserSessionExpired } from '../configuration/login/loginSlice';
import { useAppDispatch } from '../configuration/setup/hooks';
import { useSessionExpiredAcknowledged, hideSessionExpiredDialog } from '../data/appSlice';

const SessionExpiredInfo = () => {
    const dispatch = useAppDispatch();

    const userLocale = useLocale();
    const isSessionExpired = useIsUserSessionExpired();
    const sessionExpiredAcknowledged = useSessionExpiredAcknowledged();

    const handleSessionExpiredDialogClose = () => dispatch(hideSessionExpiredDialog());
    const showSessionExpired = isSessionExpired && !sessionExpiredAcknowledged;

    return (
        <SessionExpiredDialog
            locale={userLocale || DEFAULT_LOCALE}
            onClose={handleSessionExpiredDialogClose}
            show={showSessionExpired}
        />
    );
};

export default SessionExpiredInfo;