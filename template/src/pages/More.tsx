import { FormattedMessage } from 'react-intl';

import RandomUsers from '../features/users/RandomUsers';
import UserSidebarLoader from '../features/users/userSidebar/UserSidebarLoader';

const More = () => (
    <div className='container fluid-default margin-auto'>
        <h1>
            <FormattedMessage id='intl-msg:starterTemplate.sublink.more' />
        </h1>
        <div className='panel panel-default shadow-default'>
            <div className='panel-body'>
                <RandomUsers />
                <UserSidebarLoader />
            </div>
        </div>
    </div>
);

export default More;
