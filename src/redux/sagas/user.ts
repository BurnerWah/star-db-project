import axios, { AxiosResponse } from 'axios'
import { SagaIterator } from 'redux-saga'
import { call, takeLatest } from 'redux-saga/effects'
import { UserResponse } from '~typings/requests'
import { withCredentials } from '../../constants/axios'
import { put } from '../../hooks/redux'

// worker Saga: will be fired on "user/fetch" actions
function* fetchUser(): SagaIterator {
  try {
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response: AxiosResponse<UserResponse> = yield call(
      axios.get,
      '/api/user',
      withCredentials,
    )

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'user/set', payload: response.data })
    // Also mark the user as having been initialized
    yield put({ type: 'status/userInitalized' })
  } catch (error) {
    console.log('User get request failed', error)
    // If an error is thrown, then there probably isn't a user
    yield put({ type: 'status/userInitalized' })
  }
}

function* userSaga() {
  yield takeLatest('user/fetch', fetchUser)
}

export default userSaga
