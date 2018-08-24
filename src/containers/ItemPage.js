import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchItems } from '../actions'
import Spinner from '../components/Spinner'
import Comment from './Comment'
import { getHost } from '../utils/helpers'

export class ItemPage extends Component {
  state = {
    fetching: true
  }

  componentWillMount() {
    this.props.dispatch(fetchItems([this.props.match.params.id]))
  }

  componentDidMount() {
    this.fetchComments()
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) this.fetchComments()
  }

  fetchComments = () => {
    if (!this.props.item || !this.props.item.kids) {
      return
    }

    fetchComments(this.props, this.props.item).then(() => {
      this.setState(() => ({ fetching: false }))
    })
  }

  render() {
    const { item } = this.props

    return (
      <div className="item-page page-view">
        {item && (
          <div className="max-w-lg mx-auto">
            <div className="p-4 bg-white">
              <div className="">
                <h2 className="mr-3 inline">{item.title}</h2>
                <span className="text-grey-dark align-self-center">
                  {item.url && `(${getHost(item.url)})`}
                </span>
              </div>

              <div className="news-meta my-4">
                <span>{item.score} points</span> <span> | </span>{' '}
                <span>
                  by{' '}
                  <span className="underline text-base-color cursor-pointer">
                    {item.by}
                  </span>
                </span>
              </div>
            </div>

            <div className="comments bg-white mt-2 mb-6 p-5">
              <p className="flex items-center mb-4">
                {item && item.descendants
                  ? item.descendants + ' comments'
                  : 'No comments.'}

                <span className="ml-4">
                  {this.state.fetching && item.descendants ? <Spinner /> : null}
                </span>
              </p>

              {!this.state.fetching && (
                <ul className="list-reset">
                  {item.kids.map(id => (
                    <Comment key={id} id={id} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const fetchComments = (props, item) => {
  if (item && item.kids) {
    return props.dispatch(fetchItems(item.kids)).then(() =>
      Promise.all(
        item.kids.map(id => {
          return fetchComments(props.items[id])
        })
      )
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  item: state.state.items[ownProps.match.params.id],
  items: state.state.items
})

export default connect(mapStateToProps)(ItemPage)
