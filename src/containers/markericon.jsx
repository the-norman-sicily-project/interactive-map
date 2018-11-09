import React from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import Icon from '../components/icon';
import ICONS from './icons';

// Using L because a component returns React.createElement() instead of L.geoJSON(..., { pointToLayer }
// Reference: https://github.com/PaulLeCam/react-leaflet/issues/234

const setMarker = (feature, latlng) => {
  const orderType = {
    Basilian: L.marker(latlng, {
      icon: L.divIcon({
        html: ReactDOMServer.renderToString(
          <Icon icon={ICONS.MONASTERY} size={55} />
        ),
      }),
    }),
    'Augustinian Canons': L.marker(latlng, {
      icon: L.divIcon({
        html: ReactDOMServer.renderToString(
          <Icon icon={ICONS.MONASTERY} size={55} />
        ),
      }),
    }),
    'Knights of the Hospital of Saint John of Jerusalem': L.marker(latlng, {
      icon: L.divIcon({
        html: ReactDOMServer.renderToString(
          <Icon icon={ICONS.MONASTERY} size={55} />
        ),
      }),
    }),
    Benedictine: L.marker(latlng, {
      icon: L.divIcon({
        html: ReactDOMServer.renderToString(
          <Icon icon={ICONS.MONASTERY} size={55} />
        ),
      }),
    }),
    Cistercian: L.marker(latlng, {
      icon: L.divIcon({
        html: ReactDOMServer.renderToString(
          <Icon icon={ICONS.MONASTERY} size={55} />
        ),
      }),
    }),
    Cluniac: L.marker(latlng, {
      icon: L.divIcon({
        html: ReactDOMServer.renderToString(
          <Icon icon={ICONS.MONASTERY} size={55} />
        ),
      }),
    }),
    'Knights Templar': L.marker(latlng, {
      icon: L.divIcon({
        html: ReactDOMServer.renderToString(
          <Icon
            icon={ICONS.MONASTERY}
            translate="-6,-41"
            scale="1,-1"
            size={55}
          />
        ),
      }),
    }),
  };
  return (
    orderType[feature.properties.order] ||
    L.marker(latlng, {
      icon: L.divIcon({
        html: ReactDOMServer.renderToString(
          <Icon
            icon={ICONS.MONASTERY}
            color="#0000ff"
            translate="-6,-41"
            scale="1,-1"
            size={55}
          />
        ),
      }),
    })
  );
};

export default setMarker;
