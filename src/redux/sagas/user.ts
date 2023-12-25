import axios, { AxiosResponse } from 'axios'
import { SagaIterator } from 'redux-saga'
import { call, takeLatest } from 'redux-saga/effects'
import { UserResponse } from '~typings/requests'
import { put } from '../../hooks/redux.ts'

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser(): SagaIterator {
  try {
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response: AxiosResponse<UserResponse> = yield call(
      axios.get,
      '/api/user',
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      },
    )

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data })
  } catch (error) {
    console.log('User get request failed', error)
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser)
}

export default userSaga
