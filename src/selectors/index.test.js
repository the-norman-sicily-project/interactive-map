import { getLoadingState, getSitesState } from './index';
import rootReducer from '../reducers';
import {
  INIT_MAP,
  LOAD_SITES_BEGIN,
  LOAD_SITES_SUCCESS,
  LOAD_SITES_FAILURE,
} from '../actions';

describe('selectors', () => {
  describe('getLoadingState', () => {
    it('should return expected state', () => {
      expect(getLoadingState({ loading: true })).toEqual(true);
    });

    it('should memoize correctly', () => {
      let state = { loading: false };

      state = rootReducer(state, { type: INIT_MAP });
      expect(getLoadingState(state)).toEqual(false);

      state = rootReducer(state, { type: LOAD_SITES_BEGIN });
      expect(getLoadingState(state)).toEqual(true);

      state = rootReducer(state, { type: LOAD_SITES_SUCCESS });
      expect(getLoadingState(state)).toEqual(false);

      state = rootReducer(state, { type: LOAD_SITES_FAILURE });
      expect(getLoadingState(state)).toEqual(false);
    });
  });

  describe('getSitesState', () => {
    it('should return expected state', () => {
      expect(getSitesState({ sites: [1, 2, 3] })).toEqual([1, 2, 3]);
    });

    it('should memoize correctly', () => {
      let state = { sites: [1, 2, 3] };

      state = rootReducer(state, { type: INIT_MAP });
      expect(getSitesState(state)).toEqual([1, 2, 3]);

      state = rootReducer(state, { type: LOAD_SITES_BEGIN });
      expect(getSitesState(state)).toEqual([1, 2, 3]);

      state = rootReducer(state, {
        type: LOAD_SITES_SUCCESS,
        sites: [4, 5, 6],
      });
      expect(getSitesState(state)).toEqual([4, 5, 6]);

      state = rootReducer(state, { type: LOAD_SITES_FAILURE });
      expect(getSitesState(state)).toEqual([]);
    });
  });
});
