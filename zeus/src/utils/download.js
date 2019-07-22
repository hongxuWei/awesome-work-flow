import inquirer from "inquirer"
import downloadGit from "download-git-repo"
import ora from "ora"

import { error, success } from "../utils/log"
import { ERROR_CODE } from "../config/exitCode"
import { WEB, NPM_CLI, supportTypes } from "../config/supportTypes"

/**
 * 询问用户是否
 * @return {promise}
 */
const listSupportTypes = () => new Promise(resolve => {
  inquirer.prompt({
    type: "list",
    name: "type",
    message: "选择你想创建的项目类型",
    choices: [{
      name: "web 项目",
      value: WEB
    }, {
      name: "NPM CLI 包",
      value: NPM_CLI
    }]
  }).then(async answers => {
    const { type } = answers
    resolve(type)
  })
})

/**
 * 
 * 参数参考：https://www.npmjs.com/package/download-git-repo
 * @param {string} addr git 路径地址
 * @param {string} dirPath 存放路径
 * @return {promise}
 */
export const promiseDownload = (addr, dirPath) => new Promise(resolve => {
  downloadGit(addr, dirPath, { clone: true }, err => {
    resolve(err)
  })
})

/**
 * 下载模板文件
 * @param {string} path 存放路径
 * @param {string} type 模板类型
 */
const download = async (path, type) => {
  // 如果类型不在支持列表里就交互询问
  if (!supportTypes.includes(type)) {
    type = await listSupportTypes()
  }

  // 处理下载参数
  const repoPlatform = "direct"
  const repoHost = "https://github.com"
  const repoOwner = "hongxuWei"
  const repoName = "zeus-template"
  const repoBranch = type

  const remoteAddr = `${repoPlatform}:${repoHost}/${repoOwner}/${repoName}.git#${repoBranch}`

  // 下载文件
  const spinner = ora(`正在下载 ${type} 模板`)
  spinner.start()
  const downloadErr = await promiseDownload(remoteAddr, path)
  spinner.stop()
  if(downloadErr) {
    error(downloadErr)
    error(`下载 ${type} 模板失败，请重新执行`)
    process.exit(ERROR_CODE)
  }
  success(`${type} 模板下载成功`)
}

export default download
