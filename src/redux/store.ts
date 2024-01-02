import { composeWithDevTools } from '@redux-devtools/extension'
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'

const saga = createSagaMiddleware()

// Check if we're in development, and if not, don't include the redux dev tools
// A lot of sites include it in production (which is *extremely* funny), but
// it's definitely not necessary.
// Info on the dev tools: https://github.com/reduxjs/redux-devtools
const nodeenv = process.env['NODE_ENV'] || 'development'
const enhancers =
  nodeenv === 'development'
    ? composeWithDevTools(applyMiddleware(saga, logger))
    : applyMiddleware(saga)

// Creates a redux store with our reducers, middleware, and if in development,
// the redux dev tools.
const store = createStore(rootReducer, enhancers)

// tells the saga middleware to use the rootSaga
// rootSaga contains all of our other sagas
saga.run(rootSaga)

export default store

export type RootState = ReturnType<typeof store.getState>
