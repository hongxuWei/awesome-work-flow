import { storageGet } from '../../utils/chromeStorage'

export type AdBlockRule = {
  domain :string,
  rules: Array<string>,
  fuckMode?: Array<string>,
}

export const adBlockRule = [
  {
    "domain": "c.biancheng.net",
    "rules": [
      "#ad-arc-top, #ad-position-bottom, #all-course, #footer, #ad-arc-top, #header, #nice-arcs, #return-top, #topbar, #topbar-wrap, #header_wrap, #weixin-sidebar, #qq-qun-float, #main > div > a"
    ]
  },
  {
    "domain": "www.zhihu.com",
    "rules": [
      ".Pc-card.Card",
      ".TopstoryItem--advertCard",
      "footer.Footer",
      ".AppHeader.is-fixed",
      ".CornerButtons > CornerAnimayedFlex:first-child"
    ]
  },
  {
    "domain": "www.baidu.com",
    "fuckMode": [
      "::shadow > div",
      "#content_left > div:not(.result)"
    ],
    "rules": [
      ".layout .ad-block",
      "#content_right",
      ".result-op",
      ".rrecom-btn-parent"
    ]
  },
  {
    "domain": "jquery.cuishifeng.cn",
    "rules": [
      ".top-head-img",
      ".dialog-ali",
      ".btm-con",
      "#footer-con",
      "#main-menu li a[target=\"_blank\"]"
    ]
  },
  {
    "domain": "baike.baidu.com",
    "rules": [
      ".right-ad, .new-side-share, .fc-guess-like, .wgt-footer-main, .declare-wrap",
      "#side_box_unionAd"
    ]
  },
  {
    "domain": "dict.youdao.com",
    "rules": [
      "#nav, #topImgAd, #baidu-adv, #follow, #rel-search, #c_footer, iframe"
    ]
  },
  {
    "domain": "developer.mozilla.org",
    "rules": [
      ".newsletter-box"
    ]
  },
  {
    "domain": "www.jianshu.com",
    "rules": [
      ".side-tool, #note-fixed-ad-container",
      "nav a:not([href=\"/\"]), nav .logo",
      "#free-reward-panel, .show-foot, .follow-detail, .meta-bottom, .post > a, #comment-list > div:not(#normal-comment-list)",
      ".recommend-note",
      "footer",
      "#index-aside-download-qrbox",
      ".recommended-author-wrap > *:not(.recommended-authors)",
      ".youdao-img-ad"
    ]
  },
  {
    "domain": "segmentfault.com",
    "rules": [
      ".index-index .right",
      "#carousel-example-generic, .loading",
      "iframe, .blog-post .side > div:not(.post-nav), .blog-post .wrap > .text-center",
      ".side-widget",
      ".blog-post .pull-right, .article-operation, #mainLike, #mainBookmark, .article__reward-btn, .article__reward-info",
      "#loginBanner",
      "footer#footer"
    ]
  },
  {
    "domain": "juejin.im",
    "rules": [
      ".suspension-panel button:not(.to-top-btn)",
      ".sticky-section",
      ".sidebar-block.banner-block",
      ".sidebar-block.more-block",
      ".sidebar-block .sticky-banner",
      ".article-suspended-panel",
      ".sidebar-bd-entry",
      ".article-banner",
      ".ad-entry-list",
      ".timeline-content ul.entry-list > li:not([data-growing-title=\"entryList\"])",
      ".sidebar-block.wechat-sidebar-block",
      "aside .auth-section, aside .banner-section, aside .link-section, aside .more-section, .follow-section, .index-book-collect, .app-download-sidebar-block, .mobile-bottom-bar"
    ]
  },
  {
    "domain": "www.cnblogs.com",
    "rules": [
      "#home #blog-comments-placeholder, #home #comment_form, #home #sideBar, #home #blog_post_info, #footer, #footer_bottom, #header_block, #side_right .sidebar-image, #side_right > #search_block, .ad_right_text, #wrapper > #header, #wrapper > #hd_info, #cnblogs_a1"
    ]
  },
  {
    "domain": "blog.csdn.net",
    "rules": [
      "aside > div:not(#asideNewArticle):not(#asideCategory):not(#asideHotArticle)",
      ".tool-box",
      ".indexSuperise",
      ".meau-gotop-box > a:not(#backtop)",
      ".mediav_ad",
      ".hide-article-box",
      ".adsbygoogle",
      ".recommend-fixed-box"
    ]
  },
  {
    "domain": "www.csdn.net",
    "rules": [
      ".banner-ad-box, .indexSuperise, aside .slide-outer, aside .magazine_box, aside .persion_article, aside .other_company, aside .feed_viewpoint, aside .feed_vote, aside .feed_new_arrlist",
      ".csdn-side-toolbar > a:not([data-type=\"gotop\"])"
    ]
  },
  {
    "domain": "books.studygolang.com",
    "rules": [
      "#bottom",
      ".google-auto-placed"
    ]
  }
]

// 黑名单页面操作
export const registerAdBlock  = () => {
  storageGet('black', []).then((black :Array<AdBlockRule>) => {
    const { hostname } = location
    const data :AdBlockRule|undefined = black.find(item => item.domain === hostname)

    if (data && Array.isArray(data.rules) && data.rules.length > 0) {
      const style = document.createElement('style')
      style.type = "text/css"
      style.innerHTML = `${data.rules.join()} {
        display: none !important;
      }`
      document.body && document.body.appendChild(style)
    }

    if (data && Array.isArray(data.fuckMode) && data.fuckMode.length > 0) {
      const fuckMode = data.fuckMode || []
      setTimeout(() => fuckMode.forEach(selector => {
        document && document.querySelectorAll(selector).forEach(element => {
          if (element !== null && element.parentNode) {
            element.parentNode.removeChild(element)
          }
        })
      }), 1000)
    }
  })

  // "blog.csdn.net" 展开查看优化
  const { hostname } = location
  if (hostname === 'blog.csdn.net') {
    const style = document.createElement('style')
    style.type = "text/css"
    style.innerHTML = `#article_content, .article_content {
      height: auto !important;
    }`
    document.body && document.body.appendChild(style)
  }
}
