const chalk = require('chalk')
const { execPromise } = require('./util')


module.exports = async () => {
  // 去 zeus 目录下执行 build
  const buildSuccess = await execPromise(`cd poseidon && yarn build`)
  if (!buildSuccess) {
    console.log(chalk.red(`构建 Zeus 项目失败`))
    process.exit(1)
    return
  }

  console.log(chalk.green(`构建 Zues 项目成功`))
}
