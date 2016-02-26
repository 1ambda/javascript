import React from 'react'
import { bindActionCreators, } from 'redux'
import { connect, } from 'react-redux'

import Timer from '../components/Timer'
import * as actions from '../actions/actions'

class App extends React.Component {
  render() {
    return (
      <div className='grey lighten-2'>
        <Timer {...this.props} />
      </div>
    )
  }
}

App.propTypes = {
  actions: React.PropTypes.object.isRequired,
  timer: React.PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    timer: state.timer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
