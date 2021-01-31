import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import isEqual from 'lodash/isEqual';
import { fetchPlaces, fetchPlace } from '../stardog';
import {
  INIT_MAP,
  loadSitesBegin,
  loadSitesSuccess,
  loadSitesFailure,
  SET_SELECTED_PLACE,
  fetchPlaceBegin,
  fetchPlaceSuccess,
  fetchPlaceFailure,
} from '../actions';
import { currentPlaceSelector } from '../selectors';

export function* fetchSites() {
  try {
    yield put(loadSitesBegin());
    const response = yield call(fetchPlaces);
    yield put(loadSitesSuccess(response));
  } catch (e) {
    yield put(loadSitesFailure(e));
  }
}

export function* fetchSite(action) {
  try {
    const currentPlace = yield select(currentPlaceSelector, {
      key: 'currentPlace',
    });
    if (!isEqual(currentPlace.iri, action.place.placeIri)) {
      yield put(fetchPlaceBegin());
      const response = yield call(fetchPlace, action);
      yield put(fetchPlaceSuccess(response));
    }
  } catch (e) {
    yield put(fetchPlaceFailure(e));
  }
}

const initMapSaga = [takeEvery(INIT_MAP, fetchSites)];

const fetchPlaceSaga = [takeLatest(SET_SELECTED_PLACE, fetchSite)];

export default function* rootSaga() {
  yield all([...initMapSaga, ...fetchPlaceSaga]);
}
