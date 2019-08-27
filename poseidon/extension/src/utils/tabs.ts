// 获取当前选项卡ID
export const getCurrentTabId = (callback: Function = () => {}) => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (callback) {
      callback(tabs.length ? tabs[0].id : null)
    }
  })
}

// 当前标签打开某个链接
export const openUrlCurrentTab = (url: string) => {
  getCurrentTabId((tabId: number) => {
    console.log(tabId)
    chrome.tabs.update(tabId, { url: url })
  })
}
