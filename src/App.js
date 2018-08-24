import React, { Component } from 'react'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'

const history = createBrowserHistory()

class App extends Component {
  render() {
    return <React.Fragment>{routes}</React.Fragment>
  }
}

export default App
