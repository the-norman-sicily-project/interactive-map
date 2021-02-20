import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { getAllPlaces, getPlace } from '../api';

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

export function* getAllPlacesSaga() {
  try {
    yield put(loadSitesBegin());
    const response = yield call(getAllPlaces);
    const { data } = response;
    yield put(loadSitesSuccess(data));
  } catch (e) {
    yield put(loadSitesFailure(e));
  }
}

export function* getPlaceSaga(action) {
  try {
    const currentPlace = yield select(currentPlaceSelector, {
      key: 'currentPlace',
    });
    const { place = {} } = action;
    const { placeIri } = place;
    if (!isEmpty(placeIri) && !isEqual(currentPlace.iri, placeIri)) {
      yield put(fetchPlaceBegin());
      const response = yield call(getPlace, place);
      const { data } = response;
      yield put(fetchPlaceSuccess(data));
    }
  } catch (e) {
    yield put(fetchPlaceFailure(e));
  }
}

const initMapSaga = [takeEvery(INIT_MAP, getAllPlacesSaga)];

const fetchPlaceSaga = [takeLatest(SET_SELECTED_PLACE, getPlaceSaga)];

export default function* rootSaga() {
  yield all([...initMapSaga, ...fetchPlaceSaga]);
}
