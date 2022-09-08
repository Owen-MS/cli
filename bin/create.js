#!/usr/bin/env node
// 本文件为创建一个项目模版给出

import fse from 'fs-extra';
import fs from 'node:fs';
import path from "node:path";
import util from 'node:util';
import inquirer from "inquirer";
import chalk from "chalk";
import { getRepo, getTagsByRepo } from "./api.js";
import { loading } from './loading.js';
import downLoadGitRepo from 'download-git-repo';


class Creator {
  constructor(name, target) {
    this.name = name;
    this.target = target;
    this.downLoadGitRepo = util.promisify(downLoadGitRepo);
  }

  async create() {
    const repo = await this.getRepoInfo();
    const tag = await this.getTagInfo(repo);
    await this.download(repo, tag);
    // 模板使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log("  npm install\r\n");
    console.log("  npm run dev\r\n");
  }

  async getRepoInfo() {
    const repoList = await loading('fetch loading', getRepo) || [];

    const repos = repoList.map(item => item.name);
    let { repo } = await inquirer.prompt([
      {
        name: 'repo',
        type: 'list',
        message: 'Please choose a template',
        choices: repos
      }
    ])
    return repo;
    d
  }

  // 获取版本信息以及用户选择的版本
  async getTagInfo(repo) {
    let tagList = await loading('fetch loading', getTagsByRepo, repo);
    const tags = tagList.map(item => item.name);
    let { tag } = await new inquirer.prompt([
      {
        name: 'repo',
        type: 'list',
        message: 'Please choose a version',
        choices: tags
      }
    ])
    return tag;
  }

  async download(repo, tag) {
    const templateUrl = `zhurong-cli/${repo}${tag ? '#' + tag : ''}`;
    await loading(
      "downloading template, please wait",
      this.downLoadGitRepo,
      templateUrl,
      path.resolve(process.cwd(), this.target)
    )
  }
}

export default async function create(projectName, options) {
  const cwd = process.cwd();
  const targetDirectory = path.join(cwd, projectName);
  if (fse.pathExistsSync(targetDirectory)) {
    if (options.force) {
      await fse.remove(targetDirectory);
    } else {
      const isOverwrite = await inquirer.prompt([
        {
          name: 'isOverwrite',
          type: 'list',
          message: 'Target directory exists, Please choose an action',
          choices: [
            { name: 'Overwrite', value: true },
            { name: 'Cancel', value: false }
          ]
        }
      ])

      if (!isOverwrite) {
        console.log(chalk.blue('Cancel'));
        return;
      } else {
        console.log(chalk.red("\r\n Remove success"));
        await fse.remove(targetDirectory);
      }
    }
  }


  // const destUrl = path.join(cwd, 'templates');
  // fs.readdir(destUrl, (err, files) => {
  //   if (err) throw err;
  //   files.forEach(file => {
  //     const url = path.join(cwd , projectName , file);
  //     fse.ensureDir(path.join(cwd, projectName));
  //     fs.writeFileSync(url, fs.readFileSync(path.join(destUrl, file)));
  //   })
  // })

  // const CreatorProject = new Creator(projectName, targetDirectory);
  // CreatorProject.create();
}

