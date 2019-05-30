(() => {
  /* 局域变量 */
  var gBalck = [];
  /* start event modal */
  const evnetMap = {
    newDomain: () => {
      const domain = prompt('请输入域名');
      if (domain) {
        const index = gBalck.push({ domain, rules: [] }) - 1;
        storageSet('black', gBalck).then(() => {
          $('.adblock').append(
            `<section class="adblock-domain">
              <h5 class="adblock-domain-name">
                <div class="adblock-domain-name-text">${domain}</div>
                <div class="adblock-domain-name-button" data-domain-index="${index}" data-domain="${domain}">添加</div>
              </h5>
              <div class="adblock-domain-list"></div>
            </section>`
          );
        });
      }
    },
    editBlack: (e) => {
      const $element = $(e.target);
      const index = $element.data('domain-index');
      const newRule = prompt('请输入规则');
      if (newRule) {
        const ruleIndex = gBalck[index].rules.push(newRule) - 1;
        const { domain } = gBalck[index];
        storageSet('black', gBalck).then(() => {
          $('section .adblock-domain-list').eq(index).append(
            `<div class="adblock-domain-list-item">${newRule}<div class="adblock-domain-list-item-close" data-domain="${domain}" data-domain-index="${index}" data-rule-index="${ruleIndex}"data-rule="${newRule}">x</div></div>`
          );
        });
      }
    },
    removeRule: (e) => {
      const $element = $(e.target);
      const domainIndex = $element.data('domain-index');
      const ruleIndex = $element.data('rule-index');
      const rules = gBalck[domainIndex].rules;
      rules.splice(ruleIndex, 1)
      storageSet('black', gBalck).then(() => {
        $('section').eq(domainIndex)
        .find('.adblock-domain-list-item').eq(ruleIndex)
        .remove();
      });
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

  /*
    c.biancheng.net###ad-arc-top
    c.biancheng.net###ad-position-bottom
    c.biancheng.net###all-course
    c.biancheng.net###footer
    c.biancheng.net###header
    c.biancheng.net###nice-arcs
    c.biancheng.net###return-top
    c.biancheng.net###topbar
    www.zhihu.com##.Pc-card.Card
    www.zhihu.com##.TopstoryItem--advertCard
  */

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

  // storageSet('black', [{
  //   domain: 'c.biancheng.net',
  //   rules: [
  //     "#ad-arc-top",
  //     "#ad-position-bottom",
  //     "#all-course",
  //     "#footer",
  //     "#ad-arc-top",
  //     "#header",
  //     "#nice-arcs",
  //     "#return-top",
  //     "#topbar"
  //   ]
  // }, {
  //   domain: 'www.zhihu.com',
  //   rules: [".Pc-card.Card", ".TopstoryItem--advertCard"]
  // }])

  // view black list

  const renderBalckList = (black) => {
    const $container = $('.adblock');
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
    $container.append($(template));
  }
  storageGet('black', []).then(black => {
    gBalck = black;
    renderBalckList(black);
  });
})();