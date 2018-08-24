import { SET_ACTIVE_TYPE, SET_ITEMS, SET_LIST, SET_USER } from './constants'
import Api from '../api'
import { activeIds } from '../selectors'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const setActiveType = name => ({
  type: SET_ACTIVE_TYPE,
  name
})

export const setList = (name, ids) => ({
  type: SET_LIST,
  name,
  ids
})

export const setItems = items => ({
  type: SET_ITEMS,
  items
})

export const setActiveItems = ids => {
  return dispatch => {
    dispatch(fetchItems(ids))
    return Promise.resolve()
  }
}

export const fetchListData = (type, routerProps) => {
  return (dispatch, getState) => {
    dispatch(setActiveType(type))
    dispatch(showLoading())
    return Api.fetchIdsByType(type)
      .then(ids => {
        return dispatch(setList(type, ids))
      })
      .then(() => {
        let ids = activeIds(getState(), routerProps)
        dispatch(setActiveItems(ids))
        dispatch(hideLoading())
      })
      .catch(e => console.log('6', e))
  }
}

export const fetchItems = ids => {
  return (dispatch, getState) => {
    dispatch(showLoading())

    const now = Date.now()
    ids = ids.filter(id => {
      const item = getState().state.items[id]
      if (!item) {
        return true
      }
      if (now - item.lastUpdated > 1000 * 60 * 3) {
        return true
      }
      return false
    })
    if (ids.length) {
      return Api.fetchItems(ids).then(items => {
        dispatch(hideLoading())
        dispatch(setItems(items))
        localStorage.setItem('items', JSON.stringify(items))
      })
    } else {
      dispatch(hideLoading())
      return Promise.resolve()
    }
  }
}
