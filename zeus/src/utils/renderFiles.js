import path from "path"
import fs from "fs"
import globby from "globby"
import ejs from "ejs"
import ora from "ora"

const ejsTemplateReg = /__ejs__/

/**
 * 处理模板文件
 * @param {string} cwd 
 * @param {string} options 
 */
const renderFiles = async (cwd, options) => {
  // 获取目录下的所有文件
  const files = await globby(["**/*"], { cwd, dot: true })
  // 过滤模板文件
  const ejsFiles = files.filter(fileName => ejsTemplateReg.test(fileName))

  const spinner = ora("开始写入模板数据").start()
  ejsFiles.forEach(async name => {
    const sourcePath = path.join(cwd, name)
    const targetName = name.replace(ejsTemplateReg, "")
    const targePath = path.join(cwd, targetName)
    // ejs 渲染模板
    const template = ejs.render(
      fs.readFileSync(sourcePath, "utf-8"),
      { ...options }
    )
    spinner.text = `正在写入 ${targetName} 数据`
    // 写入目标文件
    await fs.writeFileSync(targePath, template)
    // 删除原模板文件
    await fs.unlinkSync(sourcePath)
  })
  spinner.stop()
}

export default renderFiles
