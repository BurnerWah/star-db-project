import axios from 'axios'
import { SagaIterator } from 'redux-saga'
import { call, takeLatest } from 'redux-saga/effects'
import { SaveItemSaga } from '~typings/actions'

function* saveItem({ payload }: SaveItemSaga): SagaIterator {
  try {
    yield call(axios.put, `/api/items/${payload}/save`, undefined, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
  } catch (error) {
    console.log('Error saving item: ', error)
  }
}

export default function* savedItemsSaga() {
  yield takeLatest('api/saveItem', saveItem)
}
