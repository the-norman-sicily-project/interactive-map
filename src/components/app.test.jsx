import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import App from './app';

describe('App', () => {
  let wrapper;
  let mockStore;
  let initialState;
  let store;

  beforeEach(() => {
    mockStore = configureStore();
    initialState = {};
    store = mockStore(initialState);
    wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it('renders the interactive map', () => {
    expect(wrapper.find('InteractiveMap')).toBeDefined();
  });
});
