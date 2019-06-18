import { ERROR_CODE } from "../config/exitCode"
import { error } from "../utils/log"

/**
 * 
 * @param {string} name
 * @isValid boolean
 */
export const validateName = (name) => {
  return /^[\w_-]+$/.test(name)
}

/**
 * 校验项目名称是否合法
 * @param {string} name 
 */
const checkName = name => {
  if (!validateName(name)) {
    error("项目名称请使用字符串, 数字, 下划线(_), 中划线(-)的组合")
    process.exit(ERROR_CODE)
  }
}

export default checkName