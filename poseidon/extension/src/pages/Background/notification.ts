// nothing to do
const noop = () => {}

export const notify  = (options: NotificationOptions, callback = noop) => {
  chrome.notifications.create(options, callback)
}
