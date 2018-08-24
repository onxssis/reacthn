import 'core-js'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import './css/tailwind.css'

import store from './store'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

const history = createBrowserHistory()

ReactDOM.render(
  <Provider store={store()}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
