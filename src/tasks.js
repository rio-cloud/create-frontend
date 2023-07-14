import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Listr } from 'listr2';
import fs from 'node:fs';
import git from 'isomorphic-git';
import replaceInFile from 'replace-in-file';
import chalk from 'chalk';
import cpy from 'cpy';
import { execSync } from 'node:child_process';

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
        { title: `Create ${chalk.green.bold(outputDir)}`, task: () => mkdir(outputDir, { recursive: true }) },
        {
            title: 'list template folder contents for debug reasons',
            task: async () => {
                execSync(`ls -al ${templateDir}`, { stdio: 'inherit' });
            },
        },
        {
            title: 'Copy frontend template code',
            task: () => cpy([`${templateDir}/**/*`, `!${templateDir}/node_modules`], outputDir),
        },
        {
            title: 'Replace config values',
            task: () =>
                replaceInFile({
                    files: ['.env.production', 'index.html', 'package.json', 'package-lock.json', 'README.md'].map(
                        (f) => resolve(outputDir, f)
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
            title: 'Set up git repository',
            task: async (ctx, task) => {
                const dir = outputDir;
                const defaultBranch = 'main';
                const filepath = '.';
                const message = 'initial commit by @rio-cloud/create-frontend';
                const author = { name: '@rio-cloud/create-frontend', email: 'uxui@rio.cloud' };

                task.output = '=> git init';
                await git.init({ fs, dir, defaultBranch });

                task.output = '=> git add --all';
                await git.add({ fs, dir, filepath });

                task.output = '=> git commit';
                await git.commit({ fs, dir, message, author });
            },
        });
    }

    return tasks;
}
