import * as ActionTypes from '../actions/ActionTypes';

const initialState = [{
  text: '',
  completed: false,
  index: 0
}];

export default function reduceTodoAction(state = [], action) {
  switch(action.type) {
    case ActionTypes.ACTION_ADD_TODO:
      return [{
        index: state.reduce((max, todo) => Math.max(todo.index, max), -1) + 1,
        completed: false,
        text: action.text
      }, ...state];
    case ActionTypes.ACTION_TOGGLE_TODO:
      return state.map(todo =>
        todo.index === action.index ?
          Object.assign({}, todo, {completed: !todo.completed}) : todo
      );

    case ActionTypes.ACTION_DELETE_TODO:
      return [...state.filter(todo =>
        todo.index !== action.index)
      ];

    default: return state;
  }
}




