#!/usr/bin/env node

import { relative } from 'node:path';
import { cwd, exit } from 'node:process';

import boxen from 'boxen';
import chalk from 'chalk';
import { retro } from 'gradient-string';

import { getArgs } from './src/args.js';
import { cli } from './src/cli.js';
import { getTasks } from './src/tasks.js';

try {
    const { appName, givenOutputDir, silent, https } = getArgs();
    const config = await cli(appName, givenOutputDir, silent);
    const tasks = await getTasks({ ...config, https });

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
} catch (error) {
    if (error.code?.startsWith('ERR_PARSE_ARGS') || error.message?.startsWith('Argument error: ')) {
        console.error(chalk.bgRed(error.message));
        exit(1);
    }

    console.error(chalk.bgRed.bold('Something went wrong. Please check the output above.'));
    exit(1);
}
