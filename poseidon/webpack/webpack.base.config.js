var path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Autoprefixer = require('autoprefixer')
const webpack = require('webpack')

const DIST_PATH = path.join(__dirname, '../dist')
const DEV_USE_MOCK = process.env.MOCK === 'on'

module.exports = {
  entry: {
    app: path.join(__dirname, '../extension/src/index.tsx'),
    background: path.join(__dirname, '../extension/src/pages/Background/index.ts'),
    content: path.join(__dirname, '../extension/src/pages/Content/index.ts'),
  },
  output: {
    filename: 'js/[name].js',
    // TODO: 使用 CDN 和资源 hash 的示例
    path: DIST_PATH
  },
  resolve: {
    extensions: [".ts", ".tsx", '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks:['app'],
      template: path.join(__dirname, '../extension/public/index.html'),
      title: 'Awesome Wrok Flow',
    }),
    Autoprefixer,
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../extension/public'),
        to: './'
      },
    ]),
    new webpack.DefinePlugin({ DEV_USE_MOCK })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }, { loader: "ts-loader" }]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  }
}
