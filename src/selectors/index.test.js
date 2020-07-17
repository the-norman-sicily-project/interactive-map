import { getLoadingState, getSitesState } from './index';
import { rootReducer } from '../reducers';
import {
  initMap,
  loadSitesBegin,
  loadSitesSuccess,
  loadSitesFailure,
} from '../actions';

describe('selectors', () => {
  describe('getLoadingState', () => {
    it('should return expected state', () => {
      expect(getLoadingState({ loading: true })).toEqual(true);
    });

    it('should memoize correctly', () => {
      let state = { loading: false };

      state = rootReducer(state, initMap());
      expect(getLoadingState(state)).toEqual(false);

      state = rootReducer(state, loadSitesBegin());
      expect(getLoadingState(state)).toEqual(true);

      state = rootReducer(state, loadSitesSuccess([]));
      expect(getLoadingState(state)).toEqual(false);

      state = rootReducer(state, loadSitesFailure(new Error('error')));
      expect(getLoadingState(state)).toEqual(false);
    });
  });

  describe('getSitesState', () => {
    it('should return expected state', () => {
      expect(getSitesState({ sites: [1, 2, 3] })).toEqual([1, 2, 3]);
    });

    it('should memoize correctly', () => {
      const initialSites = [
        { id: 'site_1', name: '1' },
        { id: 'site_2', name: '2' },
        { id: 'site_3', name: '3' },
      ];
      let state = { sites: initialSites };

      state = rootReducer(state, initMap());
      expect(getSitesState(state)).toEqual(initialSites);

      state = rootReducer(state, loadSitesBegin());
      expect(getSitesState(state)).toEqual(initialSites);

      state = rootReducer(
        state,
        loadSitesSuccess({
          features: [{ name: '4' }, { name: '5' }, { name: '6' }],
        })
      );
      expect(getSitesState(state)).toEqual([
        { id: 'site_1', name: '4' },
        { id: 'site_2', name: '5' },
        { id: 'site_3', name: '6' },
      ]);

      state = rootReducer(state, loadSitesFailure(new Error('error occurred')));
      expect(getSitesState(state)).toEqual([]);
    });
  });
});
