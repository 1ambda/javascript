import { takeEvery } from 'redux-saga'
import { put, call } from 'redux-saga/effects'

export const delay = mills => new Promise(resolve => setTimeout(resolve, mills))

export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({ type: 'INCREMENT' })
}

export function* wathIncrementAsync() {
  yield* takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export function* helloSaga() {
  console.log('Hello Sagas!')
}
