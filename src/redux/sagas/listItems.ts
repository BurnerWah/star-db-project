import axios, { AxiosResponse } from 'axios'
import { SagaIterator } from 'redux-saga'
import { call, takeLatest } from 'redux-saga/effects'
import { ListItemsBody } from '~typings/requests'
import { put } from '../../hooks/redux'

function* fetchListItems(): SagaIterator {
  try {
    const response: AxiosResponse<ListItemsBody> = yield call(
      axios.get,
      '/api/items',
    )
    yield put({ type: 'listItems/set', payload: response.data })
  } catch (error) {
    console.log('List items get request failed', error)
  }
}

export default function* listItemsSaga() {
  yield takeLatest('listItems/fetch', fetchListItems)
}
