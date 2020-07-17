import { all, call, put, takeEvery } from 'redux-saga/effects';
import config from '../config';
import {
  INIT_MAP,
  loadSitesBegin,
  loadSitesSuccess,
  loadSitesFailure,
} from '../actions';

export function* fetchSites() {
  const path = 'map/data';
  const endpoint = `${path}/${config.dataFile}`;
  try {
    yield put(loadSitesBegin());
    const response = yield call(fetch, endpoint);
    const result = yield response.json();
    yield put(loadSitesSuccess(result));
  } catch (e) {
    yield put(loadSitesFailure(e));
  }
}

export function* initMap() {
  yield takeEvery(INIT_MAP, () => fetchSites());
}

export default function* mapSaga() {
  yield all([initMap()]);
}
