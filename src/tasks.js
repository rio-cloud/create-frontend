import fs from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

import chalk from 'chalk';
import cpy from 'cpy';
import git from 'isomorphic-git';
import { Listr } from 'listr2';
import { moveFile } from 'move-file';
import { replaceInFile } from 'replace-in-file';

import { fixWindowsPaths } from './util.js';

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
    const fixedTemplateDir = fixWindowsPaths(templateDir);
    const fixedOutputDir = fixWindowsPaths(outputDir);

    const tasks = new Listr([
        { title: `Create ${chalk.green.bold(outputDir)}`, task: () => mkdir(fixedOutputDir, { recursive: true }) },
        {
            title: 'Copy frontend template code',
            task: () => cpy([`${fixedTemplateDir}/**/*`, `!${fixedTemplateDir}/node_modules`], fixedOutputDir),
        },
        {
            title: 'Create .gitignore',
            task: async (_ctx, task) => {
                try {
                    await moveFile(`${fixedOutputDir}/.npmignore`, `${fixedOutputDir}/.gitignore`);
                } catch (e) {
                    task.skip('No .npmignore found; most likely running locally?');
                }
            },
        },
        {
            title: 'Replace config values',
            task: () =>
                replaceInFile({
                    files: ['.env.production', 'index.html', 'package.json', 'package-lock.json', 'README.md'].map(f =>
                        fixWindowsPaths(resolve(outputDir, f))
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
            task: async (_ctx, task) => {
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
