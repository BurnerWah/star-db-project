import axios, { AxiosError, AxiosResponse } from 'axios'
import { SagaIterator } from 'redux-saga'
import { StrictEffect, call, takeLatest } from 'redux-saga/effects'
import { LoginSaga } from '~typings/actions'
import { put } from '../../hooks/redux'

// worker Saga: will be fired on "LOGIN" actions
function* loginUser({ payload }: LoginSaga): SagaIterator {
  try {
    // clear any existing error on the login page
    yield put({ type: 'CLEAR_LOGIN_ERROR' })

    // send the action.payload as the body
    // the config includes credentials which
    // allow the server session to recognize the user
    yield call(axios.post, '/api/user/login', payload, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })

    // after the user has logged in
    // get the user information from the server
    yield put({ type: 'FETCH_USER' })
  } catch (error: AxiosError | unknown) {
    console.log('Error with user login:', error)
    if ((error as AxiosError)?.response?.status === 401) {
      // The 401 is the error status sent from passport
      // if user isn't in the database or
      // if the username and password don't match in the database
      yield put({ type: 'LOGIN_FAILED' })
    } else {
      // Got an error that wasn't a 401
      // Could be anything, but most common cause is the server is not started
      yield put({ type: 'LOGIN_FAILED_NO_CODE' })
    }
  }
}

// worker Saga: will be fired on "LOGOUT" actions
function* logoutUser(): SagaIterator {
  try {
    // the config includes credentials which
    // allow the server session to recognize the user
    // when the server recognizes the user session
    // it will end the session
    yield axios.post('/api/user/logout', {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }) as unknown as StrictEffect<AxiosResponse>

    // now that the session has ended on the server
    // remove the client-side user object to let
    // the client-side code know the user is logged out
    yield put({ type: 'UNSET_USER' })
  } catch (error) {
    console.log('Error with user logout:', error)
  }
}

function* loginSaga() {
  yield takeLatest('LOGIN', loginUser)
  yield takeLatest('LOGOUT', logoutUser)
}

export default loginSaga
