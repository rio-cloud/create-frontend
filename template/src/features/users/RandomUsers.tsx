import Spinner from '@rio-cloud/rio-uikit/Spinner';

import { User, useFetchUsersQuery } from '../../services/userApi';
import { UserItem } from './UserItem';
import { useUserSelectionDeepLink } from '../../hooks/useUserSelectionDeepLink';

const RandomUsers = () => {
    useUserSelectionDeepLink();

    // Automatically fetch data and return query values via the query hook
    const { data, error, isLoading } = useFetchUsersQuery('20', { refetchOnFocus: true });

    return (
        <div className="RandomUser">
            <div className="text-size-20 text-medium margin-bottom-15">Random Users</div>
            {isLoading && <Spinner />}
            {error && <div>{'Users could not be fetched'}</div>}
            {data?.map((user) => (
                <UserItem key={user.name.last} {...user} />
            ))}
        </div>
    );
};

export default RandomUsers;
