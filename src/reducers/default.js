import { SET_ACTIVE_TYPE, SET_LIST, SET_ITEMS } from "../actions/constants"

const initialState = {
  activeType: null,
  itemsPerPage: 30,
  items: {},
  lists: {
    top: [],
    new: [],
    show: [],
    ask: [],
    job: []
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_TYPE:
      return { ...state, activeType: action.name }

    case SET_LIST:
      return { ...state, lists: { ...state.lists, [action.name]: action.ids } }

    case SET_ITEMS:
      let newItemState = {}

      action.items.forEach(item => {
        if (item) {
          newItemState[item.id] = item
        }
	  })
	  
      return { ...state, items: { ...state.items, ...newItemState } }

    default:
      return state
  }
}
