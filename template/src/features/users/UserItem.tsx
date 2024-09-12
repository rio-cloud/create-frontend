import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../configuration/setup/hooks';
import type { User } from '../../services/userApi';
import { getSelectedUserId, userSelected } from './userSlice';
import { routes } from '../../routes/routes';

type UserItemProps = User;

export const UserItem = (props: UserItemProps) => {
    const { id, name, email, picture } = props;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const selectedUserId = useAppSelector(getSelectedUserId);

    const handleClickUser = () => {
        dispatch(userSelected(id.value));
        navigate(`${routes.MORE}/${id.value}`);
    };

    const isSelected = selectedUserId === id.value;

    return (
        <div
            key={id.value}
            className={`cursor-pointer bg-lightest rounded hover-bg-highlight-lightest ${
                isSelected ? 'bg-highlight-lightest' : ''
            }`}
            onClick={handleClickUser}
        >
            <div className="display-flex align-items-center padding-10">
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
