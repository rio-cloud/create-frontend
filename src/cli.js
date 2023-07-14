import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { confirm, input } from '@inquirer/prompts';
import { requiredTrimmed } from './util.js';
import { rioLogo } from './rioLogo.js';

export async function cli(appName) {
    rioLogo();

    const outputDir = await input({
        message: 'Where do you want to create the project?',
        default: resolve(cwd(), appName),
        ...requiredTrimmed,
    });

    const initGit = await confirm({ message: 'Do you want to initialize a Git repository?', default: true });

    console.log();

    const clientId = await input({ message: '[OAuth] >> client ID', ...requiredTrimmed });

    const redirectUri = await input({ message: '[OAuth] >> redirect_uri', ...requiredTrimmed });

    const silentRedirectUri = await input({
        message: '[OAuth] >> silent redirect_uri',
        default: redirectUri,
        ...requiredTrimmed,
    });

    console.log();

    const sentryDsn = await input({ message: '[Sentry] >> DSN', ...requiredTrimmed });

    console.log();

    return { appName, outputDir, clientId, redirectUri, silentRedirectUri, sentryDsn, initGit };
}
