// nothing to do
const noop = () => {}

export const notifications  = (options: chrome.notifications.NotificationOptions, callback = noop):void => {
  chrome.notifications.create(options, callback)
}
