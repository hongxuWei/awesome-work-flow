const inquirer = require('inquirer')
const buildZeus = require('./zeus')

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
  if (name === 'zeus') {
    buildZeus()
  }
})
