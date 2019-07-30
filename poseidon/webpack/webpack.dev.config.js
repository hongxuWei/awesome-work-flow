const path = require('path')
const config = require('./webpack.base.config')
const apiMocker = require('mocker-api')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader')

const _config = {
  mode: 'development',
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    watchContentBase: true,
    historyApiFallback: true,     // 不跳转
    open: true,
    overlay: true,                // 报错提示
    writeToDisk: true,            // 写入磁盘文件
    before(app) {
      apiMocker(app, path.resolve('extension/src/mocks'))
    }
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        include: [/node_modules/],
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: [/node_modules/],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]'
              },
              localsConvention: 'camelCaseOnly'
            }
          },
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              modules: true
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new ChromeExtensionReloader({
      port: 9090, // Which port use to create the server
      reloadPage: true, // Force the reload of the page also
      entries: { // The entries used for the content/background scripts
        background: 'background', // *REQUIRED,
        contentScript: ['content'],
      }
    })
  ]
}

module.exports = merge(_config, config)
