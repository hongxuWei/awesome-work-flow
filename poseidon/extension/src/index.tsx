import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'

import stores from './stores'

import App from './App'

import './index.global.less'
import './index.less'

// 开启严格模式
configure({ enforceActions: 'always' })

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
)
