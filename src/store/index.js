import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import ReduxThunk from 'redux-thunk'
import rootReducer from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const history = createBrowserHistory()

export default () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(ReduxThunk))
  )
  return store
}
