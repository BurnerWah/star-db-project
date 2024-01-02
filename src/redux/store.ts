import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension'
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'

const saga = createSagaMiddleware()

// Creates a redux store with our reducers, middleware, and if in development,
// the redux dev tools.
const store = createStore(
  rootReducer,
  // Excludes dev tools in production
  composeWithDevToolsDevelopmentOnly(applyMiddleware(saga, logger)),
)

// tells the saga middleware to use the rootSaga
// rootSaga contains all of our other sagas
saga.run(rootSaga)

export default store

export type RootState = ReturnType<typeof store.getState>
