import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension'
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'

const saga = createSagaMiddleware()

// Creates a redux store with our reducers, middleware, and if in development,
// the redux dev tools.
const store = createStore(
  rootReducer,
  // Typescript gets confused by createStore's various definitions, because the
  // 2nd argument can be an enhancer *or* the preloaded state. This is the
  // easiest way to tell it that it's fine.
  undefined,
  // Excludes dev tools in production
  // We can't use redux-logger with redux v5, but the dev tools are here so
  // that should be fine.
  composeWithDevToolsDevelopmentOnly(applyMiddleware(saga)),
)

// tells the saga middleware to use the rootSaga
// rootSaga contains all of our other sagas
saga.run(rootSaga)

export default store

export type RootState = ReturnType<typeof store.getState>
