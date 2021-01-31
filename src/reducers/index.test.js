import { mapReducer } from './index';
import { INIT_MAP, LOAD_SITES_BEGIN, LOAD_SITES_SUCCESS, LOAD_SITES_FAILURE } from '../actions';

describe('mapReducer', () => {
  describe('INIT_MAP', () => {
    test('returns the correct state', () => {
      const action = { type: INIT_MAP };
      const state = { loading: false, sites: [1, 2, 3] };
      expect(mapReducer(state, action)).toMatchSnapshot();
    });
  });

  describe('LOAD_SITES_BEGIN', () => {
    test('returns the correct state', () => {
      const action = { type: LOAD_SITES_BEGIN };
      const state = { loading: false, sites: [1, 2, 3] };
      expect(mapReducer(state, action)).toMatchSnapshot();
    });
  });

  describe('LOAD_SITES_SUCCESS', () => {
    test('returns the correct state', () => {
      const action = { type: LOAD_SITES_SUCCESS, sites: [4, 5, 6] };
      const state = { loading: true, sites: [1, 2, 3] };
      expect(mapReducer(state, action)).toMatchSnapshot();
    });
  });

  describe('LOAD_SITES_FAILURE', () => {
    test('returns the correct state', () => {
      const action = {
        type: LOAD_SITES_FAILURE,
        error: new Error('Some error occurred'),
      };
      const state = { loading: true, sites: [1, 2, 3] };
      expect(mapReducer(state, action)).toMatchSnapshot();
    });
  });
});
