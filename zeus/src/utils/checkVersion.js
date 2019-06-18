import semver from "semver"
import chalk from "chalk"
import { name, engines } from "../../package.json"
import { ERROR_CODE } from "../config/exitCode"

/**
 * 检查node版本
 */
export default () => {
  const processVersion = process.version
  const engineVersion = engines.node
  if (!semver.satisfies(processVersion, engineVersion)) {
    console.log(chalk.red(`${name} 要求的 Node 版本为 ${chalk.green(engineVersion)}`))
    process.exit(ERROR_CODE)
  }
}
