import program from "commander"
import { version } from "../package.json"
import checkVersion from "./utils/checkVersion"
import { error } from "./utils/log"
import actions from "./actions/index"
import { ERROR_CODE } from "./config/exitCode.js"

checkVersion()

let projectName

// 创建开发环境
program
  .version(version)
  .arguments("<project-name>")
  .usage("<project-name> [options]")
  .description("创建业务端项目或业务公用包")
  .option("-t, --type <desktop/mobile/cli>")
  .option("-f, --force", "如果项目已存在，会覆盖该目录")
  .allowUnknownOption()
  .action((name, cmd) => {
    projectName = name
    actions.init(name, cmd)
  })

program.parse(process.argv)

if (projectName === undefined) {
  error("项目名称是必填的")
  process.exit(ERROR_CODE)
}