import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { userSelected } from '../features/users/userSlice';

// Deep linking for selected user id to automatically select it
export const useUserSelectionDeepLink = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();

    useEffect(() => {
        dispatch(userSelected(userId));
    }, [userId]);
};
