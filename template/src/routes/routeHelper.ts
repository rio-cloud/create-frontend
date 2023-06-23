import qs, { IParseOptions, IStringifyOptions } from 'qs';

export const STRINGIFY_OPTIONS: IStringifyOptions = {
    // required to stringify arrays into comma separated strings
    arrayFormat: 'comma',
    // don't use array indices
    indices: false,
    // don't encode the entire string as it will be done individually for certain params
    encode: false,
    // required to remove empty params
    skipNulls: true,
};

export const PARSE_OPTIONS: IParseOptions = {
    // required to parse comma separated string into array
    comma: true,
};

export interface RouteState {
    myId: string | undefined;
    anotherId: string | undefined;
}

export const parseRoute = (locationSearch: string): RouteState => {
    const decodedSearch = decodeURIComponent(locationSearch.replace('?', ''));
    const { myId, anotherId } = qs.parse(decodedSearch, PARSE_OPTIONS);
    return {
        myId,
        anotherId,
        // add other url params and convert them to the right type here
        // in order to easily work with them in the RouteUpdater component
    } as RouteState;
};

export const makeRoute = (searchParams: RouteState): string => {
    const queryParams = qs.stringify(searchParams, STRINGIFY_OPTIONS);
    const searchFragment = queryParams && `?${queryParams}`;
    return encodeURI(searchFragment);
};
