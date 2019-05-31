(() => {
  const storageGet = (key, defaultValue) => {
    return new Promise((resolve) => {
      const param = { [key]: defaultValue };
      chrome.storage.sync.get(param, (items) => resolve(items[key]) );
    });
  }
  /* start adblock */
  storageGet('black', []).then(black => {
    const { hostname } = location;
    const data = black.find(item => item.domain === hostname);
    if (data && Array.isArray(data.rules) && data.rules.length > 0) {
      const style = document.createElement('style');
      style.type = "text/css";
      style.innerHTML = `${data.rules.join()} {
        display: none !important;
      }`;
      document.body && document.body.appendChild(style);
    }
    if (data && Array.isArray(data.fuckMode) && data.fuckMode.length > 0) {
      setTimeout(() => data.fuckMode.forEach(selector => {
        document && document.querySelectorAll(selector).forEach(element => {
          element.parentNode.removeChild(element)
        });
      }), 3000);
    }
  });
  /* end adblock */
})();
