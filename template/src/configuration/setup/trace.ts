export const trace = import.meta.env.DEV
    ? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (...args: any) => console.log('[src/index]', ...args)
    : () => {};
