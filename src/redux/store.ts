import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'

const saga = createSagaMiddleware()

// this line creates an array of all of redux middleware you want to use
// we don't want a whole ton of console logs in our production code
// logger will only be added to your project if your in development mode
// const middlewareList =
//   process.env.NODE_ENV === 'development' ? [saga, logger] : [saga]

const store = createStore(
  // tells the saga middleware to use the rootReducer
  // rootSaga contains all of our other reducers
  rootReducer,
  // adds all middleware to our project including saga and logger
  applyMiddleware(saga, logger),
)

// tells the saga middleware to use the rootSaga
// rootSaga contains all of our other sagas
saga.run(rootSaga)

export default store

export type RootState = ReturnType<typeof store.getState>
