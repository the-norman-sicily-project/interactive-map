/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import InteractiveMap from './interactive_map';

describe('InteractiveMap', () => {
  const testProps = { loading: false };

  it('renders without crashing', () => {
    shallow(<InteractiveMap {...testProps} />);
  });

  describe('Render tests', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<InteractiveMap {...testProps} />);
    });

    it('renders a map', () => {
      expect(wrapper.find('Map')).toBeDefined();
    });

    it('renders a tile layer', () => {
      expect(wrapper.find('TileLayer')).toBeDefined();
    });

    it('renders a search bar', () => {
      expect(wrapper.find('SearchBar')).toBeDefined();
    });

    it('renders a marker cluster group', () => {
      expect(wrapper.find('MarkerClusterGroup')).toBeDefined();
    });
  });
});
