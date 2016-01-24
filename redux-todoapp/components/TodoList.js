import React, { Component, PropTypes } from 'react';

import TodoItem from "./TodoItem";

export default class TodoList extends Component {
  render() {
    const { todos, toggleTodo, deleteTodo } = this.props;

    return(
      <ul className="collection">
        {todos.map((todo) => {
          return <TodoItem key={todo.index} deleteTodo={deleteTodo} toggleTodo={toggleTodo} {...todo} />
        })}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};
