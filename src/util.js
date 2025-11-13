// used to make prevent blank / untrimmed strings
export const notBlank = str => str.trim().length > 0;
export const trim = str => str.trim();

export const requiredTrimmed = {
    validate: notBlank,
    transformer: trim,
};

/*
 * Some of the tools below (globby, cpy, etc.) can't handle paths containing backslashes.
 *
 * See https://github.com/sindresorhus/globby/issues/155
 */
export const fixWindowsPaths = process.platform === 'win32' ? path => path.replace(/\\/g, '/') : path => path;
