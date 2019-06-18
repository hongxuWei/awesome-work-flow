import json from 'rollup-plugin-json';

export default {
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
