import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders the interactive map', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('InteractiveMap')).toBeDefined();
});
