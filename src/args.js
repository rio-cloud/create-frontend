import { parseArgs } from 'node:util';

export function getArgs() {
    const { values, positionals } = parseArgs({
        options: {
            silent: { type: 'boolean', default: false },
            https: { type: 'boolean', default: false },
        },
        allowPositionals: true,
    });

    const [appName, givenOutputDir, ...otherPositionals] = positionals;
    const { silent, https } = values;

    if (!appName) {
        throw new Error('Argument error: No application name given.');
    }

    if (otherPositionals.length > 0) {
        throw new Error('Argument error: Too many positional arguments.');
    }

    return { appName, givenOutputDir, silent, https };
}
