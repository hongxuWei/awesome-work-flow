import * as React from 'react'
import { Route, HashRouter } from 'react-router-dom'
import { createBrowserHistory } from "history"

import Popup from './pages/Popup'
import NewTab from './pages/NewTab'
import AdBlock from './pages/AdBlock'

const history = createBrowserHistory()

class Router extends React.PureComponent {
  render() {
    return (
      <HashRouter>
        <Route exact
          path="/"
          history={history}
          component={Popup} />
        <Route exact
          path="/newtab"
          history={history}
          component={NewTab} />
        <Route exact
          path="/adblock"
          history={history}
          component={AdBlock} />
      </HashRouter>
    )
  }
}

export default Router
