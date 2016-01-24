import * as ActionTypes from './ActionTypes';

export function addTodo (text)  {
  return {
    type: ActionTypes.ACTION_ADD_TODO,
    text
  };
}

export function toggleTodo(index) {
  return {
    type: ActionTypes.ACTION_TOGGLE_TODO,
    index
  }
}

export function deleteTodo(index) {
  return {
    type: ActionTypes.ACTION_DELETE_TODO,
    index
  }
}




