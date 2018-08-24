import React, { Component } from 'react'
import { connect } from 'react-redux'
import { diffForHumans } from '../utils/helpers'

class Comment extends Component {
  state = {
    open: false
  }

  toggleComment = () => {
    this.setState(state => ({ open: !state.open }))
  }

  renderChildren = comment => {
    if (comment && comment.kids) {
      return (
        <React.Fragment>
          {comment.kids.map(id => (
            <Comment id={id} key={id} />
          ))}
        </React.Fragment>
      )
    }
  }

  render() {
    const { comment } = this.props
    const { open } = this.state

    return (
      <React.Fragment>
        {comment && (
          <li className="relative border-t border-base-grey">
            <div className="flex justify-between items-center news-meta my-3">
              <span>by {comment.by}</span>

              <span>{diffForHumans(comment.time)} ago</span>
            </div>

            <div
              className="my-3 text-sm"
              style={{ overflowWrap: 'break-word' }}
              dangerouslySetInnerHTML={{ __html: comment.text }}
            />

            {comment.kids &&
              comment.kids.length && (
                <div className="cmr py-1 px-2 comment-reply my-4">
                  <span
                    className="text-base-color cursor-pointer text-sm"
                    onClick={this.toggleComment}>
                    {open
                      ? `[-] hide ${pluralizeReply(comment.kids.length)}`
                      : `[+] show ${pluralizeReply(comment.kids.length)}`}
                  </span>
                </div>
              )}

            {open && (
              <ul className="list-reset">
                {/**  <li>{replies}</li> **/}
                {this.renderChildren(comment)}
              </ul>
            )}
          </li>
        )}
      </React.Fragment>
    )
  }
}

const pluralizeReply = i => i + (i === 1 ? ' reply' : ' replies')

const mapStateToProps = (state, ownProps) => ({
  comment: state.state.items[ownProps.id]
})

export default connect(mapStateToProps)(Comment)
