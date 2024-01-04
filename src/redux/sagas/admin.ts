import axios from 'axios'
import { SagaIterator } from 'redux-saga'
import { call, takeEvery } from 'redux-saga/effects'
import { AdminAddItemSaga, AdminDeleteItemSaga } from '~typings/actions'

function* deleteItem({ payload }: AdminDeleteItemSaga): SagaIterator {
  try {
    const { id } = payload
    yield call(axios.delete, `/api/admin/delete/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
  } catch (error) {
    console.log(error)
  }
}

function* addItem({ payload }: AdminAddItemSaga): SagaIterator {
  try {
    yield call(
      axios.post,
      '/api/admin/add',
      {
        name: payload.name,
        type: payload.type,
        // TODO: add the rest of the fields
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      },
    )
  } catch (error) {
    console.log(error)
  }
}

export default function* adminSaga() {
  yield takeEvery('api/admin/deleteItem', deleteItem)
  yield takeEvery('api/admin/addItem', addItem)
}
