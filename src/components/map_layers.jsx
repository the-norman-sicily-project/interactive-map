import React from 'react';
import { TileLayer, LayersControl } from 'react-leaflet';
import PropTypes from 'prop-types';
import MarkersContainer from '../containers/markers';
import config from '../config';
import apikeys from '../apikeys';

// BaseLayer for Tiles Overlay for Markers
const { BaseLayer, Overlay } = LayersControl;

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
      <Overlay checked name="All Monasteries">
        <MarkersContainer />
      </Overlay>
    </LayersControl>
  );
};

MapLayers.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default MapLayers;
