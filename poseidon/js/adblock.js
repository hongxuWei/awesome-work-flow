(() => {
  /* 局域变量 */
  var gBalck = [];
  /* start event modal */
  const evnetMap = {
    loadFromRemoteConfig: (url) => {
      url = typeof url === 'string' ? url : null
      $.ajax({
        type: "GET",
        url: url || "https://raw.githubusercontent.com/hongxuWei/awesome-work-flow/master/chrome-plugin/config/adblock.json",
        dataType: "json",
        success: function (black) {
          gBalck = black;
          storageSet('black', gBalck).then(() => reRenderAllList(black));
        }
      });
    },
    newDomain: () => {
      const domain = prompt('请输入域名');
      if (domain === '_debug_') {
        evnetMap.loadFromRemoteConfig('/config/adblock.json');
        return;
      }
      if (domain) {
        if (gBalck.find(item => item.domain === domain )) {
          var bg = chrome.extension.getBackgroundPage();
          bg.notify({
            type: 'basic',
            iconUrl: 'img/icon.png',
            title: '域名重复',
            message: `域名 ${domain} 已存在`
          });
          return;
        }
        storageSet('black', gBalck).then(() => reRenderAllList(gBalck));
      }
    },
    editBlack: (e) => {
      const $element = $(e.target);
      const index = $element.data('domain-index');
      const newRule = prompt('请输入规则');
      if (newRule) {
        if (gBalck[index].rules.find(rule => rule === newRule)) {
          var bg = chrome.extension.getBackgroundPage();
          bg.notify({
            type: 'basic',
            iconUrl: '/img/icon.png',
            title: '过滤规则重复',
            message: `过滤规则 ${newRule} 已存在`,
          });
          return;
        }
        storageSet('black', gBalck).then(() => reRenderAllList(gBalck));
      }
    },
    removeRule: (e) => {
      const $element = $(e.target);
      const domainIndex = $element.data('domain-index');
      const ruleIndex = $element.data('rule-index');
      const rules = gBalck[domainIndex].rules;
      rules.splice(ruleIndex, 1)
      if (rules.length === 0) {
        gBalck.splice(domainIndex, 1);
      }
      storageSet('black', gBalck).then(() => reRenderAllList(gBalck));
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

  const storageGet = (key, defaultValue) => {
    return new Promise((resolve) => {
      const param = { [key]: defaultValue };
      chrome.storage.sync.get(param, (items) => resolve(items[key]) );
    });
  }

  const storageSet = (key, value = null) => {
    return new Promise((resolve) => {
      const param = { [key]: value };
      chrome.storage.sync.set(param, resolve);
    });
  }

  const reRenderAllList = (black) => {
    const $container = $('#adblock');
    const $template = ceateTemplate(black);
    $container.find('section').remove();
    $container.append($template);
  }

  const ceateTemplate = (black) => {
    let template = '';
    black.forEach((item, index) => {
      const { domain, rules } = item;
      // 模板
      template += `
        <section class="adblock-domain">
          <h5 class="adblock-domain-name">
            <div class="adblock-domain-name-text">${domain}</div>
            <div class="adblock-domain-name-button" data-domain-index="${index}" data-domain="${domain}">添加</div>
          </h5>
          <div class="adblock-domain-list">
          ${rules.map((rule, ruleIndex) => (
            `<div class="adblock-domain-list-item">${rule}<div class="adblock-domain-list-item-close" data-domain="${domain}" data-domain-index="${index}" data-rule-index="${ruleIndex}"data-rule="${rule}">x</div></div>`
          )).join('')}
          </div>
        </section>`
    });
    return $(template);
  }

  storageGet('black', []).then(black => {
    gBalck = black;
    const $container = $('#adblock');
    const $template = ceateTemplate(black);
    $container.append($template);
  });
})();