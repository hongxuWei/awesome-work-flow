export const BASE_IMG_DIST_PATH = 'statics'

export type PopItem = {
  title: string,
  tools: ToolInfo[]
}

export type ToolInfo = {
  name: string,
  href: string,
  icon: string,
}


export const POPUPLIST :Array<PopItem> = [
  {
    title: "工具",
    tools: [{
      name: "广告过滤",
      href: "/adBlock",
      icon: `${BASE_IMG_DIST_PATH}/shield.png`
    }, {
      name: "Todo",
      href: "/todo",
      icon: `${BASE_IMG_DIST_PATH}/calendar.png`
    }]
  }
]

// 网站 DOM 黑名单
export const BLACK_LIST = []


