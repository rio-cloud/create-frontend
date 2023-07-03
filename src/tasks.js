import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Listr } from 'listr2';
import replaceInFile from 'replace-in-file';
import chalk from 'chalk';
import cpy from 'cpy';

export async function getTasks({
    appName,
    outputDir,
    clientId,
    redirectUri,
    silentRedirectUri,
    sentryDsn,
    initGit,
    templateDir,
}) {
    const tasks = new Listr([
        {
            title: 'Creating ' + chalk.green.bold(outputDir),
            task: () => mkdir(outputDir, { recursive: true }),
        },
        { title: 'Copying frontend template', task: () => cpy(`${templateDir}/**/*`, outputDir) },
        {
            title: 'Replacing frontend config values',
            task: () =>
                replaceInFile({
                    files: ['.env.production', 'index.html', 'package.json', 'README.md'].map((f) =>
                        resolve(outputDir, f)
                    ),
                    from: [
                        /CREATE_RIO_FRONTEND_appName/g,
                        /CREATE_RIO_FRONTEND_clientId/g,
                        /CREATE_RIO_FRONTEND_redirectUri/g,
                        /CREATE_RIO_FRONTEND_silentRedirectUri/g,
                        /CREATE_RIO_FRONTEND_sentryDsn/g,
                    ],
                    to: [appName, clientId, redirectUri, silentRedirectUri, sentryDsn],
                }),
        },
    ]);

    if (initGit) {
        tasks.add({
            title: 'Initializing a fresh Git repository (MOCK)',
            task: () =>
                new Promise((resolve) => {
                    setTimeout(resolve, 750);
                }),
        });
    }

    return tasks;
}
