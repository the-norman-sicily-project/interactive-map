/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as GreekMonastery } from './greek_monastery.svg';
import { ReactComponent as LatinMonastery } from './latin_monastery.svg';
import { ReactComponent as Bath } from './bath.svg';
import { ReactComponent as Bridge } from './bridge.svg';
import { ReactComponent as Cuba } from './cuba.svg';
import { ReactComponent as Fortification } from './fortification.svg';
import { ReactComponent as Gate } from './gate.svg';
import { ReactComponent as GreekChurch } from './greek_church.svg';
import { ReactComponent as Hospital } from './hospital.svg';
import { ReactComponent as AIcon } from './icon.svg';
import { ReactComponent as LatinChurch } from './latin_church.svg';
import { ReactComponent as Laundry } from './laundry.svg';
import { ReactComponent as Mill } from './mill.svg';
import { ReactComponent as Palace } from './palace.svg';
import { ReactComponent as Park } from './park.svg';
import { ReactComponent as Uncertain } from './uncertain.svg';
import { ReactComponent as WaterStructure } from './water_structure.svg';

const Icon = props => {
  const { placetype, order, rite, ...rest } = props;

  switch (placetype) {
    case 'bath':
      return <Bath {...rest} />;
    case 'bridge':
      return <Bridge {...rest} />;
    case 'church':
      if (rite.toLowerCase() === 'basilian' || rite.ToLowerCase() === 'greek') {
        return <GreekChurch {...rest} />;
      }
      return <LatinChurch {...rest} />;
    case 'cuba':
      return <Cuba {...rest} />;
    case 'fortification':
      return <Fortification {...rest} />;
    case 'gate':
      return <Gate {...rest} />;
    case 'hospital':
      return <Hospital {...rest} />;
    case 'icon':
      return <AIcon {...rest} />;
    case 'laundry':
      return <Laundry {...rest} />;
    case 'mill':
      return <Mill {...rest} />;
    case 'monastery':
      if (order.toLowerCase() === 'basilian') {
        return <GreekMonastery {...rest} />;
      }
      return <LatinMonastery {...rest} />;
    case 'palace':
      return <Palace {...rest} />;
    case 'park':
      return <Park {...rest} />;
    case 'uncertain':
      return <Uncertain {...rest} />;
    case 'water_structure':
      return <WaterStructure {...rest} />;
    default:
      return <div />;
  }
};

Icon.propTypes = {
  placetype: PropTypes.string.isRequired,
  order: PropTypes.string,
  rite: PropTypes.string,
};

Icon.defaultProps = {
  order: '',
  rite: '',
};

export default Icon;
