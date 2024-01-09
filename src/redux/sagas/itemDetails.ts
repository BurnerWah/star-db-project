import axios, { type AxiosResponse } from 'axios'
import { type SagaIterator } from 'redux-saga'
import { call, takeLatest } from 'redux-saga/effects'
import type { FetchItemDetailsSaga } from '~typings/actions'
import type { ItemDetails } from '~typings/requests'
import { put } from '../../hooks/redux'

function* fetchItemDetails({ payload }: FetchItemDetailsSaga): SagaIterator {
  try {
    const response: AxiosResponse<ItemDetails> = yield call(
      axios.get,
      `/api/items/${payload}`,
    )
    yield put({ type: 'itemDetails/set', payload: response.data })
  } catch (error) {
    console.log('Item details get request failed', error)
  }
}

export default function* itemDetailsSaga() {
  yield takeLatest('itemDetails/fetch', fetchItemDetails)
}
