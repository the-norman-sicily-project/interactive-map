import React from 'react';
import { shallow } from 'enzyme';
import InteractiveMap from './interactive_map';

it('renders without crashing', () => {
  shallow(<InteractiveMap />);
});

it('renders a map', () => {
  const wrapper = shallow(<InteractiveMap />);
  expect(wrapper.find('Map')).toBeDefined();
});

it('renders a tile layer', () => {
  const wrapper = shallow(<InteractiveMap />);
  expect(wrapper.find('TileLayer')).toBeDefined();
});

it('renders a search bar', () => {
  const wrapper = shallow(<InteractiveMap />);
  expect(wrapper.find('SearchBar')).toBeDefined();
});

it('renders a marker cluster group', () => {
  const wrapper = shallow(<InteractiveMap />);
  expect(wrapper.find('MarkerClusterGroup')).toBeDefined();
});
