import { createSelector } from "reselect"

export const activeIds = createSelector(
  [(state, props) => state.state, (state, props) => props],

  (state, props) => {
    const { activeType, itemsPerPage, lists } = state

    if (!activeType) {
      return []
    }

    const page = Number(props.match.params.page) || 1
    const start = (page - 1) * itemsPerPage
    const end = page * itemsPerPage

    return lists[activeType].slice(start, end)
  }
)

export const activeItems = createSelector(
  [(state, props) => state, (state, props) => props],
  (state, props) => {
    return activeIds(state, props)
      .map(id => state.state.items[id])
      .filter(_ => _)
  }
)
