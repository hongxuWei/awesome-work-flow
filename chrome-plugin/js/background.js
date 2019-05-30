chrome.contextMenus.create({
  title: '翻译：%s',
  contexts: ['selection'],
  onclick: function (params) {
    chrome.tabs.create({ url: `https://dict.youdao.com/search?q=${encodeURI(params.selectionText)}` });
  }
});

function notify (params){
  chrome.notifications.create(null, params);
}
