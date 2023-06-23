/* eslint-disable no-console */
export const trace = import.meta.env.DEV ? (...args: any) => console.log('[src/index]', ...args) : () => {};
