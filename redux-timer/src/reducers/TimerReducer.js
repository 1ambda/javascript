import * as ActionTypes from '../constants/ActionTypes'
import * as TimerStatus from '../constants/TimerStatus'

const initial = {
  counter: 0,
  status: TimerStatus.STOPPED,
}

export default function TimerReducer(state = initial, action = null) {
  switch(action.type) {
    case ActionTypes.START:
      return { ...state, status: TimerStatus.RUNNING, }
    case ActionTypes.STOP:
      return { ...state, status: TimerStatus.STOPPED, }
    case ActionTypes.TICK:
      return { ...state, counter: state.counter + 1, }
    case ActionTypes.RESET:
      return { ...state, counter: 0, }
    default:
      return state
  }
}
