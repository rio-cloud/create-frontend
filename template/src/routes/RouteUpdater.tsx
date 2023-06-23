import { batch } from 'react-redux';
import type { AnyAction } from 'redux';
import { useLocation } from 'react-router-dom';

import { makeRoute, parseRoute } from './routeHelper';
import { useRouteState, useUpdateRoute } from './routeHooks';
import { useAppDispatch, useAppSelector } from '../configuration/setup/hooks';
// import { getSelectedMyId, getSelectedAnotherId, mySomethingSelected, anotherThingSelected } from '../appSlice';

const RouteUpdater = () => {
    const dispatch = useAppDispatch();
    const { search } = useLocation();

    // const selectedMyId = useAppSelector(getSelectedMyId);
    // const selectedAnotherId = useAppSelector(getSelectedAnotherId);

    // Parse initial route or after it has changed by browser navigation or user input
    useRouteState(() => {
        const dispatchQue: AnyAction[] = [];

        const routeSearchParams = parseRoute(search);
        // const { myId, anotherId } = routeSearchParams;

        // if (myId !== selectedMyId) {
        //     dispatchQue.push(mySomethingSelected(myId));
        // }

        // if (anotherId !== selectedAnotherId) {
        //     dispatchQue.push(anotherThingSelected(anotherId));
        // }

        // batch(() => {
        //     dispatchQue.forEach((action: AnyAction) => dispatch(action));
        // });
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
