const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'zeus.js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'node-loader'
      }
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: "#!/usr/bin/env node\n",
      raw: true,
    })
  ]
};
