import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../configuration/setup/hooks';
import { ROUTE_MORE } from '../../routes/Router';
import type { User } from '../../services/userApi';
import { getSelectedUserId, userSelected } from './userSlice';

type UserItemProps = User;

export const UserItem = (props: UserItemProps) => {
    const { id, name, email, picture } = props;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const selectedUserId = useAppSelector(getSelectedUserId);

    const handleClickUser = () => {
        dispatch(userSelected(id.value));
        navigate(`${ROUTE_MORE}/${id.value}`);
    };

    const isSelected = selectedUserId === id.value;

    return (
        <div
            key={id.value}
            className={`panel panel-default margin-bottom-10 cursor-pointer hover-bg-highlight-lightest ${
                isSelected ? 'bg-highlight-lightest' : ''
            }`}
            onClick={handleClickUser}
        >
            <div className="panel-body display-flex align-items-center padding-10">
                <div className="width-60 aspect-ratio-1">
                    <img className="img-responsive rounded-circle" src={picture.thumbnail} alt="User Avatar" />
                </div>
                <div className="margin-left-10">
                    <div className="text-size-18 text-medium text-color-darker">{`${name.first} ${name.last}`}</div>
                    <div className="text-color-gray">{email}</div>
                </div>
            </div>
        </div>
    );
};
