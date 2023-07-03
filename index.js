#!/usr/bin/env node

import { argv, exit } from 'node:process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import boxen from 'boxen';
import chalk from 'chalk';
import gradient from 'gradient-string';
import { cli } from './src/cli.js';
import { getTasks } from './src/tasks.js';

const appName = argv[2];
if (!appName) {
    console.error(chalk.bgRed('No application name given.'));
    exit(1);
}

const config = await cli(appName);

const toolingDir = fileURLToPath(dirname(import.meta.url));
const templateDir = resolve(toolingDir, 'template');

const tasks = await getTasks({ ...config, templateDir });

try {
    await tasks.run();

    // `cd ${path.relative(cwd(), outputDir)}`

    console.log();
    console.log('TODO: ALL DONE message with "next steps" section');
    console.log(boxen(chalk.bold(gradient.retro('Have a nice day :)')), { margin: 1, padding: 1 }));
} catch (e) {
    console.error(chalk.bgRed.bold('Something went wrong. Please check the output above.'));
}
