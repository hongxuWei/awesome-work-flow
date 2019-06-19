import path from "path"
import checkName from "../utils/checkName"
import createDir from "../utils/createDir"
import download from "../utils/download"
import renderFiles from "../utils/renderFiles"

const init = async (name, cmd) => {
  const context = path.resolve(name)
  checkName(name)
  await createDir(name, cmd)
  
  // 下载模板文件
  const { type } = cmd
  await download(context, type)

  // 处理模板文件
  const options = {
    projectName: name
  }
  await renderFiles(options)

  console.log(1)
  // require('../lib/init')(name, parseArgs(cmd), context);
}

export default init