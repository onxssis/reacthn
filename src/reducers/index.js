import { combineReducers } from "redux"
import state from "./default"
import { loadingBarReducer } from "react-redux-loading-bar"

export default combineReducers({
  state,
  loadingBar: loadingBarReducer
})
