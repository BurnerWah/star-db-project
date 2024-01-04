import { all } from 'redux-saga/effects'
import adminSaga from './admin'
import itemDetailsSaga from './itemDetails'
import listItemsSaga from './listItems'
import loginSaga from './login.ts'
import registrationSaga from './registration'
import savedItemsSaga from './savedItems'
import userSaga from './user'

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    listItemsSaga(),
    itemDetailsSaga(),
    savedItemsSaga(),
    adminSaga(),
  ])
}
