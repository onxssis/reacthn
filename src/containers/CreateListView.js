import React from "react"
import { connect } from "react-redux"

import { fetchListData } from "../actions"
import ItemList from "./ItemList"

class CreateListView extends React.Component {
  render() {
    return <ItemList type={this.props.type} {...this.props} />
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchListData: type => dispatch(fetchListData(type, ownProps))
})

export default connect(
  null,
  mapDispatchToProps
)(CreateListView)
