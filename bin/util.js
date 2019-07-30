const chalk = require('chalk')
const { exec } = require('child_process')

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

module.exports = {
  execPromise
}
