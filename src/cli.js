import { resolve } from 'node:path';
import { cwd } from 'node:process';

import { input } from '@inquirer/prompts';

import { rioLogo } from './rioLogo.js';

const requiredTrimmed = {
    validate: str => str.trim().length > 0,
    transformer: str => str.trim(),
};

export async function cli(appName, givenOutputDir = null, silent = false) {
    if (!silent) {
        rioLogo();
    }

    const outputDir =
        givenOutputDir ??
        resolve(
            cwd(),
            await input({
                message: 'Where do you want to create the project?',
                default: resolve(cwd(), appName),
                ...requiredTrimmed,
            })
        );

    console.log();

    const clientId = await input({ message: '[OAuth] >> client ID', ...requiredTrimmed });

    const redirectUri = await input({ message: '[OAuth] >> redirect_uri', ...requiredTrimmed });

    console.log();

    const sentryDsn = await input({ message: '[Sentry] >> DSN', ...requiredTrimmed });

    console.log();

    return { outputDir, appName, clientId, redirectUri, sentryDsn };
}
