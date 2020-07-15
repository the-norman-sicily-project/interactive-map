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
    test('Dispatches load sites begin action', () =>{
      store.dispatch(actions.loadSitesBegin());
      expect(store.getActions()).toMatchSnapshot();
    });
  });
  
});