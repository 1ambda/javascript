import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class TodoInput extends Component {
  render() {
    return (
      <form>
        <div className="input-field col s6">
          <input type='text' ref='input' />
          <label>INSERT TODO</label>
        </div>
        <div className="input-field col s6">
          <a className="waves-effect waves-light btn" onClick={(e) => this.handleClick(e)}> Add </a>
        </div>
      </form>
    );
  }

  handleClick(e) {
    const { addTodo } = this.props;

    const node = ReactDOM.findDOMNode(this.refs.input);
    const text = node.value.trim();
    node.value = '';

    addTodo(text);
  }
};

TodoInput.propTypes = {
  todos: PropTypes.array.isRequired,
  addTodo: PropTypes.func.isRequired
};