export const trace = import.meta.env.DEV ? (...args: unknown[]) => console.log('[src/index]', ...args) : () => {};
