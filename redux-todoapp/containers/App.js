import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ActionCreators from "../actions/ActionCreators";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";

function mapStateToProps(state) {
  return { todos: state.todos };
}

function mapDispatchToProps(dispatch) {
  return { todoActions: bindActionCreators(ActionCreators, dispatch) };
}

class App extends Component {
  render() {
    const { todoActions, todos } = this.props;

    return (
      <div className="container">
        <h2 className="left blue-text text-darken-2">Todo App</h2>
        <div className="row">
          <div className="col s12">
            <TodoInput todos={todos} {...todoActions} /> </div>
        </div>
        <div className="row">
          <div className="col s6">
            <TodoList todos={todos} {...todoActions} />
          </div>
          <div className="col s6"> </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
