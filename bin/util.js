const chalk = require('chalk')
const { exec } = require('child_process')

// 返回一个 exec promise
const execPromise = (action) => new Promise((resolve) => {
  const res = exec(action, {
    maxBuffer: 1024 * 1024
  },(error) => {
    if (error !== null) {
      console.log(chalk.red(error))
      resolve(false)
    }
    resolve(true)
  })

  res.stdout.on('data', (data) => {
    console.log(data);
  });

  res.stderr.on('data', (data) => {
    console.log(data);
  });
})

module.exports = {
  execPromise
}
