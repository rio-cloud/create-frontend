import qs, { IStringifyOptions } from 'qs';

const QS_OPTIONS = {
    comma: true, // required to parse comma separated string into array
    arrayFormat: 'comma', // required to stringify arrays into comma separated strings
    indices: false, // don't use array indices
    encode: false, // don't encode the entire string as it will be done individually for certain params
    decode: false,
    skipNulls: true, // required to remove empty params
} as IStringifyOptions;

const BASE_URL = '#/intro';

const toQueryString = (query: unknown) => {
    const queryString = qs.stringify(query, QS_OPTIONS);
    return queryString ? `?${queryString}` : '';
};

export const prepareAndVisit = (url = BASE_URL, query?: unknown) => {
    cy.wait(10);
    cy.visit(`${url}${toQueryString(query)}`);
};
