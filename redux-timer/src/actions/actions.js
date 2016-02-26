import * as ActionTypes from '../constants/ActionTypes'
import * as TimerStatus from '../constants/TimerStatus'

export function start() {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.START, })

    const intervalId = setInterval(() => {

      const { timer, } = getState()
      const { status, } = timer

      if (TimerStatus.RUNNING === status) dispatch({ type: ActionTypes.TICK, })
      else clearInterval(intervalId)
    }, 1000)
  }
}

export function stop() {
  return { type: ActionTypes.STOP, }
}

export function reset() {
  return { type: ActionTypes.RESET, }
}
