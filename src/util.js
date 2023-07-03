// used to make prevent blank / untrimmed strings
export const notBlank = (str) => str.trim().length > 0;
export const trim = (str) => str.trim();

export const requiredTrimmed = {
    validate: notBlank,
    transformer: trim,
};
