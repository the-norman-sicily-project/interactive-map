import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'react-leaflet';
import SearchBarContainer from '../containers/search_bar';
import LegendContainer from '../containers/legend';
import config from '../config';
import MapLayersContainer from '../containers/map_layers';

const InteractiveMap = ({ loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Map
        center={config.centerPoint}
        zoom={config.initialZoom}
        maxZoom={config.maxZoom}
      >
        <MapLayersContainer />
        <SearchBarContainer />
        <LegendContainer />
      </Map>
    </div>
  );
};

InteractiveMap.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default InteractiveMap;
