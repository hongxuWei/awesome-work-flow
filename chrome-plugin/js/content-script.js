((window) => {
  const storageGet = (key, defaultValue) => {
    return new Promise((resolve) => {
      const param = { [key]: defaultValue };
      chrome.storage.sync.get(param, (items) => resolve(items[key]) );
    });
  }

  storageGet('black', []).then(black => {
    const { hostname } = location;
    const data = black.find(item => item.domain === hostname);
    if (data && data.rules.length > 0) {
      const style = document.createElement('style');
      style.type = "text/css";
      style.innerHTML = `${data.rules.join()} {
        display: none !important;
      }`;
      document.body.appendChild(style);
    }
    if (data.fuckMode) {
      setTimeout(() => data.fuckMode.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
          element.parentNode.removeChild(element)
        });
      }), 3000);
    }
  });
})(window);
