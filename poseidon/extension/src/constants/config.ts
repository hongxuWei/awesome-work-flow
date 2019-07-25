export const BASE_IMG_DIST_PATH = 'statics'

export type PopItem = {
  title: string,
  toolInfo: {
    name: string,
    href: string,
    icon: string,
  }
}


export const POPUPLIST :Array<PopItem> = [
  {
    title: "工具",
    toolInfo: {
      name: "广告过滤",
      href: "/adBlock",
      icon: `${BASE_IMG_DIST_PATH}/shield.png`
    }
  }
]

// 网站 DOM 黑名单
export const BLACK_LIST = []


