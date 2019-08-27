import * as React from 'react'
import { Route, HashRouter } from 'react-router-dom'
import { createBrowserHistory } from "history"

import Popup from './pages/Popup'
import NewTab from './pages/NewTab'
import AdBlock from './pages/AdBlock'
import TodoList from './pages/TodoList'

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
        <Route exact
          path="/todo"
          history={history}
          component={TodoList} />
      </HashRouter>
    )
  }
}

export default Router
