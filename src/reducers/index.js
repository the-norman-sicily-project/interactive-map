import { cloneDeep, set, unset, compose } from 'lodash/fp';
import {
  INIT_MAP,
  LOAD_SITES_BEGIN,
  LOAD_SITES_SUCCESS,
  LOAD_SITES_FAILURE,
} from '../actions';

export const initialState = {
  loading: false,
  sites: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_MAP:
      return cloneDeep(state);
    case LOAD_SITES_BEGIN:
      return set('loading', true, state);
    case LOAD_SITES_SUCCESS:
      return compose(
        set('loading', false),
        set('sites', action.sites),
        unset('error')
      )(state);
    case LOAD_SITES_FAILURE:
      return compose(
        set('loading', false),
        set('error', action.error),
        set('sites', [])
      )(state);
    default:
      return state;
  }
};
