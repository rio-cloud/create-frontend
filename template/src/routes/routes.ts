export const routes = {
    DEFAULT: '/',
    ERROR: '/error',
    MORE: '/more',
} as const;

export const isKnownRoute = (path: string) => {
    const knownPaths = Object.values(routes);
    return knownPaths.some((knownPath) => path.startsWith(knownPath));
};
