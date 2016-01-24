import { combineReducers } from 'redux';
import TodoActionReducer from "./TodoActionReducer";

export default combineReducers({
  todos: TodoActionReducer
});
