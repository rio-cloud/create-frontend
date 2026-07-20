import fs from 'node:fs';
import { resolve } from 'node:path';
import { env, platform } from 'node:process';

import chalk from 'chalk';
import git from 'isomorphic-git';
import { Listr } from 'listr2';
import { rimraf } from 'rimraf';
import { $, usePowerShell, usePwsh } from 'zx';

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

export function getHttpsRetryCommand({ appName, outputDir, silent }) {
    const options = [...(silent ? ['--silent'] : []), '--https'];

    return `npm create --yes @rio-cloud/frontend ${appName} ${outputDir} -- ${options.join(' ')}`;
}

function cloneTemplate({ outputDir, https, appName, silent }) {
    return {
        title: `Clone template code into ${chalk.green.bold(outputDir)}`,
        task: async () => {
            const frontendTemplateRepo = https
                ? 'https://github.com/rio-cloud/frontend-template.git'
                : 'git@github.com:rio-cloud/frontend-template.git';

            const gitEnv = { ...env, GIT_TERMINAL_PROMPT: '1' };
            delete gitEnv.GIT_ASKPASS;
            delete gitEnv.SSH_ASKPASS;

            try {
                await $({
                    stdio: 'inherit',
                    env: gitEnv,
                })`git clone ${frontendTemplateRepo} ${outputDir} --depth 1`;
            } catch (error) {
                if (https) {
                    throw error;
                }

                throw new Error(`The template repository could not be cloned using SSH.
                You may not have SSH access to GitHub. Try cloning over HTTPS instead:
                
                ${getHttpsRetryCommand({ appName, outputDir, silent })}`);
            }

            await rimraf(resolve(outputDir, '.git'));
        },
    };
}

function bootstrapProject({ outputDir, appName, clientId, redirectUri, sentryDsn }) {
    return {
        title: 'Replace config values',
        task: async (_ctx, task) => {
            const bootstrapScriptPath = resolve(outputDir, 'template-bootstrap.js');

            task.output = '=> bootstrap project';
            await $({
                cwd: outputDir,
                stdio: 'inherit',
            })`node template-bootstrap.js --appName ${appName} --clientId ${clientId} --redirectUri ${redirectUri} --sentryDsn ${sentryDsn}`;

            task.output = '=> remove bootstrap script';
            await fs.promises.unlink(bootstrapScriptPath);
        },
    };
}

function installDependencies(outputDir) {
    return {
        title: 'Install dependencies',
        task: async () => $({ cwd: outputDir, stdio: 'inherit' })`npm install`,
    };
}

function setupGitRepository(outputDir) {
    return {
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
    };
}

export const getTasks = async config =>
    new Listr(
        [
            cloneTemplate(config),
            bootstrapProject(config),
            installDependencies(config.outputDir),
            setupGitRepository(config.outputDir),
        ],
        { renderer: 'simple' }
    );
