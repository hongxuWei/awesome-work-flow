import path from "path"
import checkName from "../utils/checkName"
import createDir from "../utils/createDir"
import download from "../utils/download"
import renderFiles from "../utils/renderFiles"

import { success } from "../utils/log"

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

  await renderFiles(context, options)

  success("新建项目成功")
}

export default init