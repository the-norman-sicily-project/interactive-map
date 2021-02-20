/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkersContainer from '../containers/markers';
import SearchBarContainer from '../containers/search_bar';
import LegendContainer from '../containers/legend';
import config from '../config';

const InteractiveMap = ({ loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  const tileUrl = `http://${config.apiHost}:${config.apiPort}/mapproxy/{z}/{x}/{y}`;

  return (
    <div>
      <MapContainer center={config.centerPoint} zoom={config.initialZoom} maxZoom={config.maxZoom}>
        <TileLayer url={tileUrl} attribution={config.mapAttribution} />
        <MarkersContainer />
        <SearchBarContainer
          eventHandlers={{
            'geosearch/showlocation': (e) => console.log(JSON.stringify(e)),
          }}
        />
        <LegendContainer />
      </MapContainer>
    </div>
  );
};

InteractiveMap.propTypes = {
  loading: PropTypes.bool,
};

InteractiveMap.defaultProps = {
  loading: false,
};

export default InteractiveMap;
