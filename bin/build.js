const inquirer = require('inquirer')
const buildZeus = require('./zeus')
const buildPoseidon = require('./poseidon')

const buildList = {
  Zeus: buildZeus,
  Poseidon: buildPoseidon
}

const ZEUS = 'Zeus'
const POSEIDON = 'Poseidon'

const supportList = [ZEUS, POSEIDON]

const createChoices = () => supportList.map(projName => ({ name: projName, value: projName }))

inquirer.prompt({
  type: "list",
  name: "name",
  message: "选择你想构建的项目",
  choices: createChoices()
}).then(answers => {
  const { name } = answers
  if (typeof buildList[name] === 'function') {
    buildList[name]()
  }
})
