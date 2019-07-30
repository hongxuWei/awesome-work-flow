import { adBlockRule, AdBlockRule } from '../../constants/adBlockRule'

export const BLACK_KAY = 'black'

export const storageGet = (key: string, defaultValue:Array<AdBlockRule>) => (
  new Promise(resolve => {
    const param = { [key]: defaultValue }
    chrome.storage.sync.get(param, items => resolve(items[key]) )
  })
)

export const storageSet = (key: string, value:Array<AdBlockRule>) => (
  new Promise(resolve => {
    chrome.storage.sync.set({ [key]: value }, resolve)
  })
)

// 黑名单页面操作
export const registerAdBlock  = () => {
  // 获取黑名单信息
  storageGet(BLACK_KAY, []).then((black:Array<AdBlockRule>) => {
    const { hostname } = location
    const data = black.find(item => item.domain === hostname)
    if (data && Array.isArray(data.rules) && data.rules.length > 0) {
      const style = document.createElement('style')
      style.type = "text/css"
      style.innerHTML = `${data.rules.join()} {
        display: none !important;
      }`
      document.body && document.body.appendChild(style)
    }
    if (data && Array.isArray(data.fuckMode)) {
      const {fuckMode} = data
      setTimeout(() => fuckMode.forEach(selector => {
        document && document.querySelectorAll(selector).forEach(element => {
          element.parentNode && element.parentNode.removeChild(element)
        })
      }), 1000)
    }
  })
  // "blog.csdn.net" 展开查看优化
  const { hostname } = location
  if (hostname === 'blog.csdn.net') {
    const style = document.createElement('style')
    style.type = "text/css"
    style.innerHTML = `#article_content, .article_content {
      height: auto !important;
    }`
    document.body && document.body.appendChild(style)
  }
}
