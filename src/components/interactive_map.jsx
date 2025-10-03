/* eslint-disable no-console */
import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslate } from 'react-redux-multilingual';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkersContainer from '../containers/markers';
import SearchBarContainer from '../containers/search_bar';
import LegendContainer from '../containers/legend';
import ErrorBoundary from './ErrorBoundary';
import config from '../config';

import 'leaflet/dist/leaflet.css';

const InteractiveMap = memo(({ loading }) => {
  const translate = useTranslate();

  // Memoize tile configuration to prevent recalculation on every render
  const tileConfig = useMemo(() => {
    const hasMapboxToken = config.mapbox.accessToken;
    const tileUrl = hasMapboxToken
      ? `https://api.mapbox.com/styles/v1/${config.mapbox.username}/${config.mapbox.styleId}/tiles/256/{z}/{x}/{y}@2x?access_token=${config.mapbox.accessToken}`
      : config.fallbackTileUrl;
    const attribution = hasMapboxToken ? config.mapAttribution : config.fallbackAttribution;

    return { tileUrl, attribution };
  }, []);

  if (loading) {
    return <div>{translate('loading')}</div>;
  }

  return (
    <div>
      <MapContainer center={config.centerPoint} zoom={config.initialZoom} maxZoom={config.maxZoom}>
        <TileLayer url={tileConfig.tileUrl} attribution={tileConfig.attribution} />

        <ErrorBoundary
          title="Map Markers Error"
          message="Unable to display map markers. Some places may not be visible."
          showRetry>
          <MarkersContainer />
        </ErrorBoundary>

        <ErrorBoundary title="Search Error" message="Search functionality is temporarily unavailable." showRetry>
          <SearchBarContainer />
        </ErrorBoundary>

        <ErrorBoundary title="Legend Error" message="Map legend is temporarily unavailable." showRetry={false}>
          <LegendContainer />
        </ErrorBoundary>
      </MapContainer>
    </div>
  );
});

InteractiveMap.displayName = 'InteractiveMap';

InteractiveMap.propTypes = {
  loading: PropTypes.bool,
};

InteractiveMap.defaultProps = {
  loading: false,
};

export default InteractiveMap;
