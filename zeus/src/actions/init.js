// import path from "path"
import checkName from "../utils/checkName"
import createDir from "../utils/createDir"

const init = async (name, cmd) => {
  // const context = path.resolve(name)
  checkName(name)
  await createDir(name, cmd)
  console.log(1)
  // require('../lib/init')(name, parseArgs(cmd), context);
}

export default init