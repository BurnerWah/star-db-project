import axios from 'axios'
import { SagaIterator } from 'redux-saga'
import { call, takeEvery } from 'redux-saga/effects'
import { AdminAddItemSaga, AdminDeleteItemSaga } from '~typings/actions'
import { ItemSubmission } from '~typings/requests'
import {
  prepareDeclination,
  prepareDistance,
  prepareRightAscension,
} from '../../lib/formats'

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
    const submission: ItemSubmission = {
      name: payload.name,
      type: payload.type,
      declination: prepareDeclination(payload.declination),
      right_ascension: prepareRightAscension(payload.right_ascension),
      distance: prepareDistance(payload.distance),
      apparent_magnitude: payload.apparent_magnitude,
      absolute_magnitude: payload.absolute_magnitude,
      mass: payload.mass,
      redshift: payload.redshift,
      nasa_image_id: payload.nasa_image_id,
    }
    yield call(axios.post, '/api/admin/add', submission, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
  } catch (error) {
    console.log(error)
  }
}

export default function* adminSaga() {
  yield takeEvery('api/admin/deleteItem', deleteItem)
  yield takeEvery('api/admin/addItem', addItem)
}
