import { mkdir } from 'node:fs/promises';
import { Listr } from 'listr2';
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
            title: 'Replacing frontend config values (MOCK)',
            task: () => {
                return new Promise((resolve) => {
                    setTimeout(resolve, 750);
                });
            },
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
