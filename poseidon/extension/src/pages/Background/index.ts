import { notify as notification } from './notification'
import { translateMenus } from './translate'

// 用于其他页面调用 notify
const notify = notification
// 翻译插件
translateMenus()
