import React, { useMemo } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import Icon from '../icons';
import { orderColorLookup } from '../utils';
import config from '../config';
import 'leaflet/dist/leaflet.css';
import './PlaceMap.css';

const PlaceMap = ({ latitude, longitude, placeType, monasticIdentity }) => {
  const tileConfig = useMemo(() => {
    const hasMapboxToken = config.mapbox.accessToken;
    const tileUrl = hasMapboxToken
      ? `https://api.mapbox.com/styles/v1/${config.mapbox.username}/${config.mapbox.styleId}/tiles/256/{z}/{x}/{y}@2x?access_token=${config.mapbox.accessToken}`
      : config.fallbackTileUrl;
    const attribution = hasMapboxToken ? config.mapAttribution : config.fallbackAttribution;

    return { tileUrl, attribution };
  }, []);

  const markerIcon = useMemo(() => {
    if (!placeType) {
      return null;
    }

    const size = 30;
    const order = monasticIdentity || '';
    const normalizedOrder = order.toLowerCase().replace(/ /g, '_');
    const color = orderColorLookup(normalizedOrder);

    return L.divIcon({
      className: 'place-marker',
      html: ReactDOMServer.renderToString(
        <Icon placetype={placeType} order={order} fill={color} width={`${size}px`} height={`${size}px`} />,
      ),
    });
  }, [placeType, monasticIdentity]);

  if (!latitude || !longitude) {
    return null;
  }

  const position = [latitude, longitude];

  return (
    <div className="place-map-container">
      <MapContainer
        center={position}
        zoom={12}
        scrollWheelZoom={false}
        dragging
        touchZoom
        doubleClickZoom
        zoomControl
        style={{ height: '300px', width: '100%' }}
      >
        <TileLayer url={tileConfig.tileUrl} attribution={tileConfig.attribution} />
        {markerIcon && <Marker position={position} icon={markerIcon} />}
      </MapContainer>
    </div>
  );
};

PlaceMap.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  placeType: PropTypes.string,
  monasticIdentity: PropTypes.string,
};

PlaceMap.defaultProps = {
  latitude: null,
  longitude: null,
  placeType: null,
  monasticIdentity: null,
};

export default PlaceMap;
