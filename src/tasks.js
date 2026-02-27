import fs from 'node:fs';
import { resolve } from 'node:path';
import { env, platform } from 'node:process';

import chalk from 'chalk';
import git from 'isomorphic-git';
import { Listr } from 'listr2';
import { replaceInFile } from 'replace-in-file';
import { rimraf } from 'rimraf';
import { $, usePowerShell, usePwsh } from 'zx';

import { fixWindowsPaths } from './util.js';

if (platform === 'win32') {
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

export const getTasks = async ({ appName, outputDir, clientId, redirectUri, silentRedirectUri, sentryDsn, https }) =>
    new Listr(
        [
            {
                title: `Clone template code into ${chalk.green.bold(outputDir)}`,
                task: async () => {
                    const frontendTemplateRepo = https
                        ? 'https://github.com/rio-cloud/frontend-template.git'
                        : 'git@github.com:rio-cloud/frontend-template.git';

                    const gitEnv = { ...env, GIT_TERMINAL_PROMPT: '1' };
                    delete gitEnv.GIT_ASKPASS;
                    delete gitEnv.SSH_ASKPASS;

                    await $({
                        stdio: 'inherit',
                        env: gitEnv,
                    })`git clone ${frontendTemplateRepo} ${outputDir} --depth 1`;

                    await rimraf(resolve(outputDir, '.git'));
                },
            },
            {
                title: 'Replace config values',
                task: () =>
                    replaceInFile({
                        files: ['.env.production', 'index.html', 'package.json', 'package-lock.json', 'README.md'].map(
                            f => fixWindowsPaths(resolve(outputDir, f))
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
                    task.output = '=> git init';
                    const dir = outputDir;
                    const defaultBranch = 'main';
                    await git.init({ fs, dir, defaultBranch });

                    task.output = '=> git add --all';
                    const filepath = '.';
                    await git.add({ fs, dir, filepath });

                    task.output = '=> git commit';
                    const message = 'initial commit by @rio-cloud/create-frontend';
                    const author = { name: '@rio-cloud/create-frontend', email: 'uxui@rio.cloud' };
                    await git.commit({ fs, dir, message, author });
                },
            },
        ],
        {
            renderer: https ? 'simple' : 'default',
        }
    );
