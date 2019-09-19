import { translateMenus } from './translate'
import { registerOmnibox } from './omnibox'
import { registerEvents } from './event'
registerOmnibox()
// 翻译插件
translateMenus()

registerEvents()
