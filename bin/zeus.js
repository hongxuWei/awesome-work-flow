const inquirer = require('inquirer')
const { exec } = require('child_process')
const chalk = require('chalk')

// 返回一个 exec promise
const execPromise = (action) => new Promise((resolve) => {
  exec(action, (error) => {
    if (error !== null) {
      console.log(chalk.red(error))
      resolve(false)
    }
    resolve(true)
  })
})

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
