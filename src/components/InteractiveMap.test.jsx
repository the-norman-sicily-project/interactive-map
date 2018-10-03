import React from 'react';
import { shallow } from 'enzyme';
import InteractiveMap from './InteractiveMap';

it('renders without crashing', () => {
  shallow(<InteractiveMap />);
});
