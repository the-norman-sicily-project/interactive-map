import configureStore from 'redux-mock-store';

import * as actions from './index';

const mockStore = configureStore();
const store = mockStore();

describe('actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('initMap', () => {
    test('Dispatches init map action', () => {
      store.dispatch(actions.initMap());
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('loadSitesBegin', () => {
    test('Dispatches load sites begin action', () => {
      store.dispatch(actions.loadSitesBegin());
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('loadSitesSuccess', () => {
    test('Dispatches load sites success action', () => {
      store.dispatch(actions.loadSitesSuccess({ features: [1, 2, 3] }));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('loadSitesFAILURE', () => {
    test('Dispatches load sites failure action', () => {
      store.dispatch(actions.loadSitesFailure(new Error('error occurred')));
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
