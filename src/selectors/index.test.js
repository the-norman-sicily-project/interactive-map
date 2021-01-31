import { loadingSelector, sitesSelector } from './index';
import { mapReducer } from '../reducers';
import { initMap, loadSitesBegin, loadSitesSuccess, loadSitesFailure } from '../actions';

describe('selectors', () => {
  describe('loadingSelector', () => {
    it('should return expected state', () => {
      expect(loadingSelector({ loading: true })).toEqual(true);
    });

    it('should memoize correctly', () => {
      let state = { loading: false };

      state = mapReducer(state, initMap());
      expect(loadingSelector(state)).toEqual(false);

      state = mapReducer(state, loadSitesBegin());
      expect(loadingSelector(state)).toEqual(true);

      state = mapReducer(state, loadSitesSuccess([]));
      expect(loadingSelector(state)).toEqual(false);

      state = mapReducer(state, loadSitesFailure(new Error('error')));
      expect(loadingSelector(state)).toEqual(false);
    });
  });

  describe('sitesSelector', () => {
    it('should return expected state', () => {
      expect(sitesSelector({ sites: [1, 2, 3] })).toEqual([1, 2, 3]);
    });

    it('should memoize correctly', () => {
      const initialSites = [
        { id: 'site_1', name: '1' },
        { id: 'site_2', name: '2' },
        { id: 'site_3', name: '3' },
      ];
      let state = { sites: initialSites };

      state = mapReducer(state, initMap());
      expect(sitesSelector(state)).toEqual(initialSites);

      state = mapReducer(state, loadSitesBegin());
      expect(sitesSelector(state)).toEqual(initialSites);

      state = mapReducer(
        state,
        loadSitesSuccess({
          features: [{ name: '4' }, { name: '5' }, { name: '6' }],
        }),
      );
      expect(sitesSelector(state)).toEqual([
        { id: 'site_1', name: '4' },
        { id: 'site_2', name: '5' },
        { id: 'site_3', name: '6' },
      ]);

      state = mapReducer(state, loadSitesFailure(new Error('error occurred')));
      expect(sitesSelector(state)).toEqual([]);
    });
  });
});
