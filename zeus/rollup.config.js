import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'

const config = {
  input: 'src/index.js',
  output: {
    banner: '#!/usr/bin/env node',
    format: 'cjs',
    file: './bin/zeus.js'
  },
  plugins: [
    json()
  ]
}

if (process.env.NODE_ENV === 'production') {
  // 压缩
  config.plugins.push(terser())
}

export default config
