import chalk from "chalk"

/**
 * 输出 常规 信息
 * @param {string} msg 
 */
export const log = msg => {
  console.log(msg)
}

/**
 * 输出 蓝色 信息
 * @param {string} msg 
 */
export const info = msg => {
  console.info(chalk.blue(msg))
}

/**
 * 输出 绿色 信息
 * @param {string} msg 
 */
export const success = msg => {
  console.log(chalk.green(msg))
}

/**
 * 输出 黄色 信息
 * @param {string} msg 
 */
export const warn = msg => {
  console.warn(chalk.yellow(msg))
}

/**
 * 输出 红色 信息
 * @param {string} msg 
 */
export const error = msg => {
  console.error(chalk.red(msg))
}
