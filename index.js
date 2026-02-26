#!/usr/bin/env node

import { relative } from 'node:path';
import { argv, cwd, exit } from 'node:process';

import boxen from 'boxen';
import chalk from 'chalk';
import { retro } from 'gradient-string';

import { cli } from './src/cli.js';
import { getTasks } from './src/tasks.js';

const appName = argv[2];
const givenOutputDir = argv[3];
const silent = argv[4] === '--silent';

if (!appName) {
    console.error(chalk.bgRed('No application name given.'));
    exit(1);
}

try {
    const config = await cli(appName, givenOutputDir, silent);
    const tasks = await getTasks(config);

    await tasks.run();

    if (!silent) {
        console.log();
        console.log(chalk.bold('All done - your project is ready! Start hacking immediately:'));
        console.log();
        console.log(`> ${chalk.cyan(`cd ${relative(cwd(), config.outputDir)}`)}`);
        console.log(`> ${chalk.cyan('npm install')}`);
        console.log(`> ${chalk.cyan('npm start')}`);
        console.log(boxen(chalk.bold(retro('Have a nice day :)')), { margin: 1, padding: 1 }));
    }
} catch {
    console.error(chalk.bgRed.bold('Something went wrong. Please check the output above.'));
}
