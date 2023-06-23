import { useContext } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

import UserSidebar from './UserSidebar';
import { AppContext } from '../../../layout/AppContext';
import { useAppSelector } from '../../../configuration/setup/hooks';
import { getSelectedUserId } from '../userSlice';
import { ROUTE_MORE } from '../../../routes/Router';

const UserSidebarLoader = () => {
    const { sidebarRef } = useContext(AppContext);

    const navigate = useNavigate();
    const selectedUserId = useAppSelector(getSelectedUserId);

    const handleCloseSidebar = () => navigate(ROUTE_MORE);

    if (!(sidebarRef?.current && selectedUserId)) {
        return null;
    }

    return ReactDOM.createPortal(
        <UserSidebar onClose={handleCloseSidebar} selectedUserId={selectedUserId} />,
        sidebarRef.current
    );
};

export default UserSidebarLoader;
