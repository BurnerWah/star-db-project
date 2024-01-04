import axios from 'axios'
import { SagaIterator } from 'redux-saga'
import { call, takeLatest } from 'redux-saga/effects'
import { RegisterSaga } from '~typings/actions'
import { put } from '../../hooks/redux'

// worker Saga: will be fired on "api/auth/register" actions
function* registerUser({ payload }: RegisterSaga): SagaIterator {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'errors/registration/clear' })

    // passes the username and password from the payload to the server
    yield call(axios.post, '/api/user/register', payload)

    // automatically log a user in after registration
    yield put({ type: 'api/auth/login', payload })

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    // btw this never existed in the first place
    // yield put({ type: 'SET_TO_LOGIN_MODE' })
  } catch (error) {
    console.log('Error with user registration:', error)
    yield put({ type: 'errors/registration/fail' })
  }
}

function* registrationSaga() {
  yield takeLatest('api/auth/register', registerUser)
}

export default registrationSaga
