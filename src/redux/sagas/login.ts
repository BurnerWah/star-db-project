import axios, { type AxiosError } from 'axios'
import type { SagaIterator } from 'redux-saga'
import { call, takeLatest } from 'redux-saga/effects'
import type { LoginSaga } from '~typings/actions'
import { withCredentials } from '../../constants/axios'
import { put } from '../../hooks/redux'

// worker Saga: will be fired on "api/auth/login" actions
function* loginUser({ payload }: LoginSaga): SagaIterator {
  try {
    // clear any existing error on the login page
    yield put({ type: 'errors/login/clear' })

    // send the action.payload as the body
    // the config includes credentials which
    // allow the server session to recognize the user
    yield call(axios.post, '/api/user/login', payload, withCredentials)

    // after the user has logged in
    // get the user information from the server
    yield put({ type: 'user/fetch' })
  } catch (error: AxiosError | unknown) {
    console.log('Error with user login:', error)
    if ((error as AxiosError)?.response?.status === 401) {
      // The 401 is the error status sent from passport
      // if user isn't in the database or
      // if the username and password don't match in the database
      yield put({ type: 'errors/login/fail' })
    } else {
      // Got an error that wasn't a 401
      // Could be anything, but most common cause is the server is not started
      yield put({ type: 'errors/login/failNoCode' })
    }
  }
}

// worker Saga: will be fired on "api/auth/logout" actions
function* logoutUser(): SagaIterator {
  try {
    // the config includes credentials which
    // allow the server session to recognize the user
    // when the server recognizes the user session
    // it will end the session
    yield call(axios.post, '/api/user/logout', withCredentials)

    // now that the session has ended on the server
    // remove the client-side user object to let
    // the client-side code know the user is logged out
    yield put({ type: 'user/unset' })
  } catch (error) {
    console.log('Error with user logout:', error)
  }
}

function* loginSaga() {
  yield takeLatest('api/auth/login', loginUser)
  yield takeLatest('api/auth/logout', logoutUser)
}

export default loginSaga
