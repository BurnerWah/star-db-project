import axios, { AxiosResponse } from 'axios'
import { SagaIterator } from 'redux-saga'
import { call, takeLatest } from 'redux-saga/effects'
import { SaveItemSaga } from '~typings/actions'
import { ListItemsBody } from '~typings/requests'
import { put } from '../../hooks/redux'

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

/**
 * Lists saved items for the current user.
 * This hijacks the listItems reducer to store the saved items since they're
 * the same types, and won't ever be set at the same time.
 */
function* listSavedItems(): SagaIterator {
  try {
    yield put({ type: 'LIST_ITEMS::UNSET' })
    const response: AxiosResponse<ListItemsBody> = yield call(
      axios.get,
      '/api/saved',
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      },
    )
    yield put({ type: 'LIST_ITEMS::SET', payload: response.data })
  } catch (error) {
    console.log('Error listing saved items: ', error)
  }
}

export default function* savedItemsSaga() {
  yield takeLatest('api/saveItem', saveItem)
  yield takeLatest('api/listSavedItems', listSavedItems)
}
