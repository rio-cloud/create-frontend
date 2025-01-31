import type { Action } from 'redux';
import { useLocation } from 'react-router';

import { parseRoute } from './routeHelper';
import { useRouteState } from './routeHooks';
import { useAppDispatch } from '../configuration/setup/hooks';
// import { getSelectedMyId, getSelectedAnotherId, mySomethingSelected, anotherThingSelected } from '../appSlice';

const RouteUpdater = () => {
    const dispatch = useAppDispatch();
    const { search } = useLocation();

    // const selectedMyId = useAppSelector(getSelectedMyId);
    // const selectedAnotherId = useAppSelector(getSelectedAnotherId);

    // Parse initial route or after it has changed by browser navigation or user input
    useRouteState(() => {
        const dispatchQue: Action<string>[] = [];

        const routeSearchParams = parseRoute(search);
        // const { myId, anotherId } = routeSearchParams;

        // if (myId !== selectedMyId) {
        //     dispatchQue.push(mySomethingSelected(myId));
        // }

        // if (anotherId !== selectedAnotherId) {
        //     dispatchQue.push(anotherThingSelected(anotherId));
        // }

        // dispatchQue.forEach((action: AnyAction) => dispatch(action));
    });

    // Update route whenever an observed store prop changes.
    // The key of the RouteState is the search param key in the URL.
    // const newRoute = makeRoute({
    //     myId: selectedMyId,
    //     anotherId: selectedAnotherId,
    // });

    // useUpdateRoute(newRoute);

    return null;
};

export default RouteUpdater;
