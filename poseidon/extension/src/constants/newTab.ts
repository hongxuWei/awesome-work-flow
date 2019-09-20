export type TFavList = {
  title: string,
  item: Array<TNewTab>,
}


export type TNewTab = {
  name: string,
  href: string,
  bgClass: string,
}

const NewTab:Array<TFavList> = [{
  title: "文档",
  item: [{
    name: 'Antd',
    href: 'https://ant.design/docs/react/introduce-cn',
    bgClass: 'antd',
  },{
    name: 'Go by Example',
    href: 'https://gobyexample.com/',
    bgClass: 'go-by-example',
  },{
    name: 'Iconfont',
    href: 'https://www.iconfont.cn/collections/index',
    bgClass: 'iconfont',
  },{
    name: 'GO语言中文网',
    href: 'https://books.studygolang.com/',
    bgClass: 'studygolang',
  },{
    name: 'Node.js',
    href: 'https://nodejs.org/dist/latest-v10.x/docs/api/',
    bgClass: 'nodejs',
  },{
    name: 'Webpack',
    href: 'https://www.webpackjs.com/concepts/',
    bgClass: 'webpack',
  },{
    name: 'rollup.js',
    href: 'https://www.rollupjs.com/guide/zh',
    bgClass: 'rollup',
  },{
    name: 'npm',
    href: 'https://www.npmjs.cn/',
    bgClass: 'npm',
  },{
    name: 'Yarn',
    href: 'https://yarn.bootcss.com/docs/',
    bgClass: 'yarn',
  },{
    name: 'TS',
    href: 'https://www.tslang.cn/docs/handbook/basic-types.html',
    bgClass: 'ts',
  }, {
    name: 'WebGL',
    href: 'https://webglfundamentals.org/webgl/lessons/zh_cn/',
    bgClass: 'webgl'
  }]
}, {
  title: "常用",
  item: [{
    name: 'GitHub',
    href: 'https://github.com/',
    bgClass: 'github',
  }]
}]


export default NewTab