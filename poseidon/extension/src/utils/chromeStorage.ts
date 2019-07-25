export const storageGet = (key:string, defaultValue:any) => new Promise(resolve => {
  const param = { [key]: defaultValue }
  chrome.storage.sync.get(param, items => resolve(items[key]) )
})

export const storageSet = (key:string, value:any = null) => new Promise(resolve => {
  const param = { [key]: value }
  chrome.storage.sync.set(param, resolve)
})