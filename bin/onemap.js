#!/usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
const inquirer = require("inquirer");

const package = require("../package.json");
// const clearArgs = require("../utils/cli-args");
const log = console.log;

console.log(
  chalk.yellowBright.bold(
    `------------------------------------------\n     Welcome to use OneMap CLI    \n------------------------------------------`
  )
);

const clearArgs = (cmd) => {
  const args = {};
  cmd.options.forEach((o) => {
    const key = o.long.slice(2);
    //如果当前命令通过key能取到这个值，则存在这个值
    if (cmd[key]) args[key] = cmd[key];
  });
  return args;
};

program.version(require("../package").version).usage("<command> [options]");

//创建create命令 并进行操作
program
  .command("create <app-name>")
  .description("create a new project")
  .option("-f,--force", "overwrite target if it exists")
  .action((name, cmd) => {
    if (!name) {
      log(chalk.red("please write project name"));
      return;
    }
    require("../lib/create.js")(name);
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
