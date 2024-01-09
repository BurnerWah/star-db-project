import axios, { type AxiosResponse } from 'axios'
import { type SagaIterator } from 'redux-saga'
import { call, takeLatest } from 'redux-saga/effects'
import type { SaveItemSaga, UnsaveItemSaga } from '~typings/actions'
import type { ItemSaveBody, ListItemsBody } from '~typings/requests'
import { withCredentials } from '../../constants/axios'
import { put } from '../../hooks/redux'

function* saveItem({ payload }: SaveItemSaga): SagaIterator {
  try {
    yield call(
      axios.put,
      `/api/saved/add`,
      { id: payload } as ItemSaveBody,
      withCredentials,
    )
    // Refresh item details
    yield put({ type: 'itemDetails/fetch', payload })
  } catch (error) {
    console.log('Error saving item: ', error)
  }
}

function* unsaveItem({ payload }: UnsaveItemSaga): SagaIterator {
  try {
    yield call(axios.delete, `/api/saved/remove/${payload}`, withCredentials)
    // Refresh item details
    yield put({ type: 'itemDetails/fetch', payload })
  } catch (error) {
    console.log('Error unsaving item: ', error)
  }
}

/**
 * Lists saved items for the current user.
 * This hijacks the listItems reducer to store the saved items since they're
 * the same types, and won't ever be set at the same time.
 */
function* listSavedItems(): SagaIterator {
  try {
    yield put({ type: 'listItems/unset' })
    const response: AxiosResponse<ListItemsBody> = yield call(
      axios.get,
      '/api/saved',
      withCredentials,
    )
    yield put({ type: 'listItems/set', payload: response.data })
  } catch (error) {
    console.log('Error listing saved items: ', error)
  }
}

export default function* savedItemsSaga() {
  yield takeLatest('api/saveItem', saveItem)
  yield takeLatest('api/unsaveItem', unsaveItem)
  yield takeLatest('api/listSavedItems', listSavedItems)
}
