(() => {
  /* start event modal */
  const evnetMap = {
    goAdBlock: () => {
      window.open(chrome.extension.getURL('pages/ad_block.html'));
    },
    goCommonWeb: () => {
      window.open(chrome.extension.getURL('pages/common_web.html'));
    }
  };

  const bindEvent = (bindData, $element) => {
    const eventReg = /^(\w*):(\w*)(.*)?$/;
    if (!bindData || !eventReg.test(bindData)) {
      return false;
    }
    const eventType = bindData.replace(eventReg, '$1');
    const eventHandlerName = bindData.replace(eventReg, '$2');
    const proxy = bindData.replace(eventReg, '$3').replace(':', '');
    if (typeof evnetMap[eventHandlerName] !== 'function') {
      return false;
    }
    if (proxy) {
      $element.on(eventType, proxy, evnetMap[eventHandlerName]);
    } else {
      $element.on(eventType, evnetMap[eventHandlerName]);
    }
    return true;
  }

  const $willBindElements = $('[data-on]');

  $willBindElements.each((_, element) => {
    const $element = $(element);
    const data = $element.data('on');
    const dataItem = data.split('||');
    dataItem.forEach(data => {
      if (!bindEvent(data, $element)) {
        console.log(element, '事件绑定失败', data);
      }
    });
  });
  /* end event modal */
})();
