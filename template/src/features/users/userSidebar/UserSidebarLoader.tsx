import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router';

import UserSidebar from './UserSidebar';
import { useAppContext } from '../../../layout/AppContext';
import { useSelectedUserId } from '../userSlice';
import { routes } from '../../../routes/routes';

const UserSidebarLoader = () => {
    const { sidebarRef } = useAppContext();

    const navigate = useNavigate();
    const selectedUserId = useSelectedUserId();

    const handleCloseSidebar = () => navigate(routes.MORE);

    if (!(sidebarRef?.current && selectedUserId)) {
        return null;
    }

    return ReactDOM.createPortal(
        <UserSidebar onClose={handleCloseSidebar} selectedUserId={selectedUserId} />,
        sidebarRef.current
    );
};

export default UserSidebarLoader;
