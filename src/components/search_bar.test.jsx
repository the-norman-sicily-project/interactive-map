import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from './search_bar';

describe('SearchBar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchBar />);
  });

  it('renders a geo search control', () => {
    expect(wrapper.find('GeoSearchControl')).toBeDefined();
  });
});
