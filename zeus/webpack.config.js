const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'zeus.js'
  }
};
