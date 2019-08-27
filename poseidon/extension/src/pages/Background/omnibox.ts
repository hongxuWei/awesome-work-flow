import {
  openUrlCurrentTab,
} from '../../utils'

const searchKeyMap = {
  'Github 搜索': 'https://github.com/search?q=',
  '知乎搜索': 'https://www.zhihu.com/search?type=content&q=',
  '百度搜索': 'https://www.baidu.com/s?ie=UTF-8&wd=',
}
const LINK = ' '

const searchKeys = Object.keys(searchKeyMap) as Array<keyof typeof searchKeyMap>

export const registerOmnibox = () => {
  chrome.omnibox.onInputChanged.addListener((text, suggest) => {
    if (!text) {
      return
    }
    suggest(
      searchKeys.map(key => ({
        content: `${key}${LINK}${text}`,
        description: `${key}${LINK}${text}`
      }))
    )
  })

  // 当用户接收关键字建议时触发
  chrome.omnibox.onInputEntered.addListener(text => {
    if (!text) {
      return
    }
    const keysLen = searchKeys.length
    for(let keyIndex = 0; keyIndex < keysLen; keyIndex++) {
      const key = searchKeys[keyIndex]
      const startStr = `${key}${LINK}`
      if (text.startsWith(startStr)) {
        const href = `${searchKeyMap[key]}${text.replace(startStr, '')}`
        openUrlCurrentTab(href)
        return
      }
    }
    // 默认 google 搜索
    const href = `https://www.google.com/search?q=${text}`
    openUrlCurrentTab(href)
  })
}