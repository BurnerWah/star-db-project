import axios, { type AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import { call, takeLatest } from 'redux-saga/effects'
import type { FetchListItemsSaga } from '~typings/actions'
import type { ListingResponse } from '~typings/requests'
import { put } from '../../hooks/redux'

function* fetchListItems({ payload }: FetchListItemsSaga): SagaIterator {
  try {
    const { search, page, page_size } = payload || {}
    const response: AxiosResponse<ListingResponse> = yield call(
      axios.get,
      '/api/items',
      {
        params: { search, page, page_size },
      },
    )
    yield put({ type: 'listItems/set', payload: response.data })
  } catch (error) {
    console.log('List items get request failed', error)
  }
}

export default function* listItemsSaga() {
  yield takeLatest('listItems/fetch', fetchListItems)
}
