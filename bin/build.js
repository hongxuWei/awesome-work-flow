const inquirer = require('inquirer')
const { exec } = require('child_process')
const chalk = require('chalk')

inquirer.prompt({
  type: "list",
  name: "name",
  message: "选择你想构建的项目",
  choices: [{
    name: "Zeus",
    value: 'zeus'
  }]
}).then(answers => {
  const { name } = answers
  exec(`cd ${name} && yarn build`, (error) => {
    if (error !== null) {
      console.log(chalk.red(`构建 ${name} 项目失败`))
      console.log(chalk.red(error))
      process.exit(1)
    }
    console.log(chalk.green(`构建 ${name} 项目成功`))
  })
})
