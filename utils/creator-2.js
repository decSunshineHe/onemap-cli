const { wrapLoading } = require("./wrap-load");
const inquirer = require("inquirer");
const exec = require("child_process").exec;

//downloadGitRepo 为普通方法，不支持promise
const downloadGitRepo = require("download-git-repo");
const util = require("util");
const path = require("path");
const log = require("./log");
const loading = require("./loading");

class Creator {
  constructor(projectName, targetDir) {
    this.name = projectName; //项目文件名称
    this.target = targetDir; //项目文件目录

    // 将downloadGitRepo 转化成promise的函数
    // this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  async create() {
    //先获取当前的模版信息
    let inputInfo = await this.getRepoList();
    //获取下载路径
    let downloadUrl = path.resolve(process.cwd(), this.target);

    //根据选择的模版和版本下载当前的地址内容
    this.downloadGit(inputInfo, downloadUrl, (info) => {
      console.log("接收", info);
      // 下载完成后进入到当前的下载url中进行安装node_modules以及安装完成后进行提示
      let result = this.downloadNodeModules(downloadUrl);
    });
  }
  async getRepoList() {
    let inputInfo = await inquirer.prompt([
      {
        name: "project",
        type: "input",
        default: this.name,
        message: "Project name",
      },
      {
        name: "description",
        type: "input",
        message: "Project description",
      },
      {
        name: "author",
        type: "input",
        message: "Author",
      },
      {
        name: "map",
        type: "list",
        choices: ["Arcgis", "Leaflet"],
        default: 0,
        message: "Map Engine",
      },
    ]);
    return inputInfo;
  }

  downloadGit(inputInfo, downloadUrl, callback) {
    console.log("下载后的地址", downloadUrl);
    //先拼接出下载路径
    let requestUrl = "github:decSunshineHe/VMap-SSR";

    //2.把路径资源下载到某个路径上
    // await wrapLoading(
    //   this.downloadGitRepo,
    //   "Waiting for download the template",
    //   requestUrl,
    //   downloadUrl
    // );

    downloadGitRepo(requestUrl, downloadUrl, { clone: true }, function (err) {
      callback("返回");
    });
    return downloadUrl;
  }
  async downloadNodeModules(downLoadUrl) {
    let that = this;
    log.success("\n √ Generation completed!");

    const execProcess = `cd ${downLoadUrl} && npm install`;
    loading.show("Downloading node_modules");
    exec(execProcess, function (error, stdout, stderr) {
      if (error) {
        loading.fail(error);
        log.warning(
          `\r please enter file ${that.name} to install dependencies`
        );
        log.success(`\n cd ${that.name} \n npm install \n`);
        process.exit();
      } else {
        log.success(`\n cd ${that.name} \n npm run server \n`);
      }
      process.exit();
    });
    return true;
  }
}
module.exports = Creator;
