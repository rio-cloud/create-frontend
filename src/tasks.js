import fs from 'node:fs';
import { resolve } from 'node:path';

import chalk from 'chalk';
import git from 'isomorphic-git';
import { Listr } from 'listr2';
import { replaceInFile } from 'replace-in-file';
import { rimraf } from 'rimraf';
import { $, usePowerShell, usePwsh } from 'zx';

import { fixWindowsPaths } from './util.js';

const env = process.env;

if (process.platform === 'win32') {
    if (env.POWERSHELL_DISTRIBUTION_CHANNEL) {
        // PowerShell ≥ 6/7 (Core / pwsh)
        console.log('Using pwsh 7+', env.POWERSHELL_DISTRIBUTION_CHANNEL);
        usePwsh();
    } else if (env.PSModulePath && !env.POWERSHELL_DISTRIBUTION_CHANNEL) {
        // Windows PowerShell 5.x
        console.log('Using legacy PowerShell');
        usePowerShell();
    }
}

export const getTasks = async ({ appName, outputDir, clientId, redirectUri, silentRedirectUri, sentryDsn }) =>
    new Listr([
        {
            title: `Clone template code into ${chalk.green.bold(outputDir)}`,
            task: async () => {
                await $`git clone git@github.com:rio-cloud/frontend-template.git ${outputDir}`;
                await rimraf(resolve(outputDir, '.git'));
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
        {
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
        },
    ]);
