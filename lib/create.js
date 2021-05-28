const path = require("path");
const fse = require("fs-extra");
const inquirer = require("inquirer");
const Creator = require("../utils/creator");
const log = require("../utils/log");
//创建项目
module.exports = async function (projectName) {
  // todo 校验文件内容格式
  //获取当前命令执行时候的工作目录
  const cwd = process.cwd();

  //获取当前target的目录
  const targetDir = path.join(cwd, projectName);

  //判断当前的文件夹是否存在
  if (fse.existsSync(targetDir)) {
    console.log("存在");
  }

  //当前文件操作已经完成 开始创建项目

  let creator = new Creator(projectName, targetDir);
  creator.create();
};
