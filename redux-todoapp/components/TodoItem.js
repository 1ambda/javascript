import React, { Component, PropTypes } from 'react';

export default class TodoItem extends Component {
  render() {
    return (
      <li className="collection-item"
          onClick={e => {this.toggle(); e.preventDefault();}} >
        <input className="filled-in" type="checkbox"
               id={"item" + this.props.index}
               checked={ this.props.completed ? "checked" : "" } />
        <label htmlFor={"item" + this.props.index}
               style={{
                 textDecoration: this.props.completed ? 'line-through' : 'none',
                 cursor: this.props.completed ? 'default' : 'pointer' }}>
          <div className="blue-text text-darken-2"> {this.props.text} </div>
        </label>
        <a onClick={e => {this.delete(); e.stopPropagation();}}
           className="secondary-content"><i className="material-icons">delete</i></a>
      </li>
    );
  }

  toggle() {
    const { index } = this.props;
    this.props.toggleTodo(index);
  }

  delete() {
    const { index } = this.props;
    this.props.deleteTodo(index);
  }
}

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};