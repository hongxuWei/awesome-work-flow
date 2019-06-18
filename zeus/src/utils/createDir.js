import fs from "fs"
import inquirer from "inquirer"

import { ERROR_CODE } from "../config/exitCode"
import { info } from "../utils/log"
import { validateName } from "./checkName"

// 确认二次输入的目录名称
const confirName = async cmd => {
  await inquirer.prompt({
    type: "input",
    name: "name",
    message: "请重新输入项目名称",
    validate: (value) => {
      if (validateName(value)) {
        return true
      }
      return "项目名称请使用字符串, 数字, 下划线(_), 中划线(-)的组合"
    }
  }).then(async answers => {
    const { name } = answers
    await createDir(name, cmd)
  })
}

/**
 * 创建文件夹 如果已经存在就询问用户是否覆盖
 * @param {string} dirName 
 */
const createDir = async (dirName, cmd) => {
  const { force } = cmd
  if (fs.existsSync(dirName)) {
    // 如果是 force 模式
    if (force) {
      info(`正在使用 force 模式删除目录 ${dirName}`)
      fs.rmdirSync(dirName)
      info(`正在重建目录 ${dirName}`)
      fs.mkdirSync(dirName)
      return
    }
    // 如果不是 force 模式就交互询问
    await inquirer.prompt({
      type: "list",
      name: "overwrite",
      message: "目录已经存在",
      choices: [{
        name: "覆盖原目录",
        value: 1
      }, {
        name: "不，我要重新修改名称",
        value: 2
      }, {
        name: "取消",
        value: 3
      }]
    }).then(async answers => {
      const { overwrite } = answers
      switch (overwrite) {
      case 1: 
        info(`正在删除目录 ${dirName}`)
        fs.rmdirSync(dirName)
        info(`正在重建目录 ${dirName}`)
        fs.mkdirSync(dirName)
        break
      case 2:
        await confirName(cmd)
        break
      default:
        process.exit(ERROR_CODE)
      }
    })
    return
  }
  // 新建目录
  info(`正在新建目录 ${dirName}`)
  fs.mkdirSync(dirName)
}

export default createDir
