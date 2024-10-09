import qs, { type IStringifyOptions } from 'qs';

const QS_OPTIONS = {
    comma: true, // required to parse comma separated string into array
    arrayFormat: 'comma', // required to stringify arrays into comma separated strings
    indices: false, // don't use array indices
    encode: false, // don't encode the entire string as it will be done individually for certain params
    decode: false,
    skipNulls: true, // required to remove empty params
} as IStringifyOptions;

export type QueryParams = {
    foo?: string;
    skipBar?: boolean;
};

export const toQueryString = (query: QueryParams) => {
    const queryString = qs.stringify(query, QS_OPTIONS);
    return queryString ? `?${queryString}` : '';
};
