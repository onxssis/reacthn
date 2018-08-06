import React, { Component } from "react"
import { createBrowserHistory } from "history"
import { ConnectedRouter } from "connected-react-router"
import routes from "./routes"

const history = createBrowserHistory()

class App extends Component {
  render() {
    return <ConnectedRouter history={history}>{routes}</ConnectedRouter>
  }
}

export default App
