/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslate } from 'react-redux-multilingual';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkersContainer from '../containers/markers';
import SearchBarContainer from '../containers/search_bar';
import LegendContainer from '../containers/legend';
import config from '../config';

import 'leaflet/dist/leaflet.css';

const InteractiveMap = ({ loading }) => {
  const translate = useTranslate();

  if (loading) {
    return <div>{translate('loading')}</div>;
  }

  const tileUrl = `http://${config.apiHost}:${config.apiPort}/mapproxy/{z}/{x}/{y}`;

  return (
    <div>
      <MapContainer center={config.centerPoint} zoom={config.initialZoom} maxZoom={config.maxZoom}>
        <TileLayer url={tileUrl} attribution={config.mapAttribution} />
        <MarkersContainer />
        <SearchBarContainer />
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
