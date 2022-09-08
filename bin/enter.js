#!/usr/bin/env node
// commander -- 命令行指令配置 n. 指挥官、负责人。司令员
// chalk -- 命令行美化工具 n. （白色或者彩色的）粉笔 版本过高有问题
// inquirer -- 命令行交互工具
// ora -- 命令行loading 效果
// fs-extra 更友好的文件操作
// download-git-repo 命令行下载工具 可以从git中下载并提取一个git repository
// figlet 生成ASCII 的艺术字


import { program } from "commander";
import pck from '../package.json' assert { type: "json" };
import chalk from "chalk";
// import inquirer from "inquirer";
// import figlet from 'figlet';
// import ora from "ora";


// const spinner = ora('Loading unicorns').start();
// setTimeout(() => {
//   spinner.color = 'yellow';
//   spinner.text = 'Loading rainbows';
// }, 1000)
// spinner.succeed();
// spinner.fail();
program
  .name('za')
  .usage(`<command> [option]`)
  .version(`za-cli ${pck.version}`);


program
  .command('create <projecr-name>')
  .description('create a new project')
  .option("-f, --force", "overwrite target directory if it exists")
  .action(async (projectName, cmd) => {
    await (await import('./create.js')).default(projectName, cmd);
  })


program
  .command("config [value]")
  .command("config [value]") // config 命令
  .description("inspect and modify the config")
  .option("-g, --get <key>", "get value by key")
  .option("-s, --set <key> <value>", "set option[key] is value")
  .option("-d, --delete <key>", "delete option by key")
  .action((value, keys) => {
    // value 可以取到 [value] 值，keys会获取到命令参数
    console.log(value, keys);
  });

program.on('--help', function () {
  // 前后两个空行调整格式，更舒适
  console.log();
  console.log(
    `Run ${chalk.cyan(
      "za-cli <command> --help"
    )} for detailed usage of given command.`
  );
  console.log();
})
program.parse(process.argv);
console.log('hello world');
// console.log(`hello ${chalk.blue('worl')}`);
// console.log(chalk.blue.bgRed.bold('hello world'));
// console.log(
//   chalk.green(
//     "I am a green line " +
//     chalk.blue.underline.bold("with a blue substring") +
//     " that becomes green again!"
//   )
// );

// inquirer.prompt([
//   {
//     name: 'taro-template',
//     type: "checkbox",
//     message: "check the plugin needed for your project ?",
//     choices: [
//       {
//         name: 'Babel',
//         checked: true
//       },
//       {
//         name: 'TypeScript'
//       }
//     ]
//   }
// ])
//   .then(data => {
//     console.log(chalk.green());
//   })


// figlet('hello World')