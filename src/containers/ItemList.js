import React from "react"
import { connect } from "react-redux"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import Api from "../api"
import { setList, setActiveItems } from "../actions"
import { activeIds, activeItems } from "../selectors"
import Paginator from "../components/Paginator"
import Item from "../components/Item"

class ItemList extends React.PureComponent {
  state = {
    page: Number(this.props.match.params.page) || 1,
    displayedPage: Number(this.props.match.params.page) || 1,
    displayedItems: this.props.activeItems
  }

  loadItems = (to = this.state.page, from = -1) => {
    this.props.fetchListData(this.props.type).then(() => {
      if (this.state.page < 0 || this.state.page > this.maxPage()) {
        this.props.history.replace(`/${this.props.type}/1`)
        return
      }

      this.setState((prevState, props) => {
        return {
          displayedPage: to,
          displayedItems: props.activeItems
        }
      })
    })
  }

  maxPage = () => {
    const { itemsPerPage, lists } = this.props.state
    return Math.ceil(lists[this.props.type].length / itemsPerPage)
  }

  hasMore = () => {
    return this.state.page < this.maxPage()
  }

  changeNextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }))
  }

  changePrevPage = () => {
    this.setState(prevState => ({
      page: prevState.page - 1
    }))
  }

  componentWillMount() {
    this.loadItems(this.state.page)

    // watch the current list for realtime updates
    this.unwatchList = Api.watchList(this.props.type, ids => {
      this.props.dispatch(setList(this.props.type, ids))
      this.props.dispatch(setActiveItems(this.props.activeIds)).then(() => {
        this.setState(() => {
          return {
            displayedItems: this.props.activeItems
          }
        })
      })
    })
  }

  componentWillUnmount() {
    this.unwatchList()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.activeItems !== prevProps.activeItems) {
      this.setState({ displayedItems: this.props.activeItems })
    }

    if (
      this.state.page !== prevState.page ||
      this.props.match.params.page !== prevProps.match.params.page
    ) {
      this.setState(() => ({ page: Number(this.props.match.params.page) || 1 }))
      this.loadItems(this.props.match.params.page, prevState.page)
    }
  }

  render() {
    const { type } = this.props

    return (
      <div className="news-view page-view">
        <div className="news-list mt-8 md:mt-12 max-w-lg mx-auto bg-white">
          <Paginator
            page={this.state.page}
            maxPage={this.maxPage()}
            hasMore={this.hasMore()}
            type={type}
            nextPage={this.changeNextPage}
            prevPage={this.changePrevPage}
          />

          {this.state.displayedPage > 0 && (
            <div className="news-list">
              <ul className="list-reset">
                <TransitionGroup>
				  
				{this.state.displayedItems.map(item => (
                    <CSSTransition
                      classNames="fade"
                      key={item.id}
					  timeout={500}>
					  
					  <Item key={item.id} item={item} />
					  
                    </CSSTransition>
				))}
				  
                </TransitionGroup>
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, otherProps) => ({
  state: state.state,
  activeIds: activeIds(state, otherProps),
  activeItems: activeItems(state, otherProps)
})

export default connect(mapStateToProps)(ItemList)
