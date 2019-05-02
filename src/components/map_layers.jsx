import React from 'react';
import { TileLayer, LayersControl } from 'react-leaflet';
import PropTypes from 'prop-types';
import config from '../config';
import apikeys from '../apikeys';

const { BaseLayer } = LayersControl;

const MapLayers = ({ loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <LayersControl position="topright">
      <BaseLayer checked name="Default">
        <TileLayer
          url={config.tileURL + apikeys.MAPBOX_ACCESS_TOKEN}
          attribution={config.mapAttribution}
        />
      </BaseLayer>
    </LayersControl>
  );
};

MapLayers.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default MapLayers;
