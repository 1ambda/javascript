import React from 'react'

import * as TimerStatus from '../constants/TimerStatus'

const styles = {
  container: {
    marginTop: 30,
  },

  counter: {
    fontSize: 75,
    fontWeight: 100,
  },

  button: {
    margin: 5,
  },
}

const CLASS_BUTTON_ACTIVE = 'yellow darken-3'
const CLASS_BUTTON_DISABLED = 'disabled'

export default class Timer extends React.Component {

  getButtonStyleClass(status) {
    if (TimerStatus.RUNNING === status)
      return { start: CLASS_BUTTON_DISABLED, end: CLASS_BUTTON_ACTIVE, }
    else
      return { start: CLASS_BUTTON_ACTIVE, end: CLASS_BUTTON_DISABLED, }
  }

  render() {

    const { timer, actions, } = this.props
    const { counter, status, } = timer

    const { start, end, } = this.getButtonStyleClass(status)

    return (
      <div className='row' style={styles.container}>
        <div className='col s4 offset-s4'>
          <div className='card blue-grey darken-1'>
            <div className='card-content white-text center'>
              <span className='card-title'>{status}</span>
              <p style={styles.counter}>{counter}</p>
            </div>
            <div className='card-action center'>
              <a style={styles.button} onClick={actions.start}
                 className={`${start} waves-effect waves-light btn`}>START</a>
              <a style={styles.button} onClick={actions.stop}
                 className={`${end} waves-effect waves-light btn`}>STOP</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Timer.propTypes = {
  actions: React.PropTypes.object.isRequired,
  timer: React.PropTypes.object.isRequired,
}
