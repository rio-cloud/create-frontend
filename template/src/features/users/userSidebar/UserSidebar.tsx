import Sidebar from '@rio-cloud/rio-uikit/Sidebar';

import { User, useFetchUsersQuery } from '../../../services/userApi';

type UserSidebarProps = {
    selectedUserId: string;
    onClose: () => void;
};

const UserSidebar = (props: UserSidebarProps) => {
    const { selectedUserId, onClose } = props;

    // Will select the user with the given id, and will only rerender if the given user data changes
    const { selectedUser } = useFetchUsersQuery(undefined, {
        selectFromResult: ({ data }) => ({
            selectedUser: data?.find((user) => user.id.value === selectedUserId),
        }),
    });

    return (
        <Sidebar
            title="Sidebar Right"
            titleClassName="padding-left-10"
            closed={false}
            onClose={onClose}
            position={Sidebar.RIGHT}
            enableFullscreenToggle
            resizable
            minWidth={300}
            maxWidth={600}
            switchModeBreakpoint={1400}
            footer={
                <button className="btn btn-primary" type="button" onClick={onClose}>
                    Close
                </button>
            }
        >
            <div className="padding-left-20 padding-right-20">
                <label>User</label>
                <div>{selectedUser?.name.first}</div>
            </div>
        </Sidebar>
    );
};

export default UserSidebar;
