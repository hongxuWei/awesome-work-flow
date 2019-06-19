import program from "commander"
import { version } from "../package.json"
import checkVersion from "./utils/checkVersion"
import { error } from "./utils/log"
import actions from "./actions/index"

checkVersion()
program.version(version).usage("<command> [options]")

// 创建开发环境
program
  .command("init <project-name>")
  .description("创建业务端项目或业务公用包")
  .option("-t, --type <desktop/mobile/cli>", "项目类型")
  .option("-f, --force", "如果项目已存在，会覆盖该目录")
  .action((name, cmd) => {
    actions.init(name, cmd)
  })

// 未注册命令提示帮助
program.arguments("<command>").action(cmd => {
  error(`\n未找到命令 ${cmd}\n`)
  program.outputHelp()
})

program.parse(process.argv)
