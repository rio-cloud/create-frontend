import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAfterMount from '@rio-cloud/rio-uikit/useAfterMount';

export const useRouteState = (callback: Function) => {
    const { search } = useLocation();
    const searchRef = useRef('');

    useEffect(() => {
        if (searchRef.current === search) {
            return;
        }
        callback();
        searchRef.current = search;
    }, [search]);
};

export const useUpdateRoute = (newSearch: string) => {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();

    useAfterMount(() => {
        if (search !== newSearch) {
            navigate(pathname + newSearch);
        }
    }, newSearch);
};
