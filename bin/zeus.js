const inquirer = require('inquirer')
const chalk = require('chalk')
const { execPromise } = require('./util')

module.exports = async () => {
  // 去 zeus 目录下执行 build
  const buildSuccess = await execPromise(`cd zeus && yarn build`)
  if (!buildSuccess) {
    console.log(chalk.red(`构建 Zeus 项目失败`))
    process.exit(1)
    return
  }

  console.log(chalk.green(`构建 Zues 项目成功`))

  // 询问是否发布
  const { willDeploy } = await inquirer.prompt({
    type: "confirm",
    name: "willDeploy",
    message: "是否打算发布新版本"
  })

  if (!willDeploy) {
    return
  }

  // 去 zeus 目录下执行 deploy
  const deploySuccess = await execPromise(`cd zeus && yarn deploy`)
  if (!deploySuccess) {
    console.log(chalk.red(`发布 Zeus 项目失败`))
    process.exit(1)
    return
  }
}
