import { createStore, applyMiddleware, compose, } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

export default function configureStore(initialState) {
  let store

  if (window.devToolsExtension) {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ))
  } else {
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk)
    )
  }

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
