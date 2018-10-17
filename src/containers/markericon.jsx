import React from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import Icon from '../components/icon';
import ICONS from './icons';

// Using L because a component returns React.createElement() instead of L.geoJSON(..., { pointToLayer }
// Reference: https://github.com/PaulLeCam/react-leaflet/issues/234

const setMarker = (properties, latlng) => {
  const orderType = {
    Basilian: L.marker(latlng, {
      icon: L.divIcon({
        html: ReactDOMServer.renderToString(<Icon icon={ICONS.MONASTERY} />),
      }),
    }),
    'Augustinian Canons': L.marker(latlng, {
      icon: L.divIcon({
        html: ReactDOMServer.renderToString(<Icon icon={ICONS.MONASTERY} />),
      }),
    }),
    'Knights of the Hospital of Saint John of Jerusalem': L.marker(latlng, {
      icon: L.divIcon({
        html: ReactDOMServer.renderToString(<Icon icon={ICONS.MONASTERY} />),
      }),
    }),
    Benedictine: L.marker(latlng, {
      icon: L.divIcon({
        html: ReactDOMServer.renderToString(<Icon icon={ICONS.MONASTERY} />),
      }),
    }),
    Cistercian: L.marker(latlng, {
      icon: L.divIcon({
        html: ReactDOMServer.renderToString(<Icon icon={ICONS.MONASTERY} />),
      }),
    }),
    Cluniac: L.marker(latlng, {
      icon: L.divIcon({
        html: ReactDOMServer.renderToString(<Icon icon={ICONS.MONASTERY} />),
      }),
    }),
    'Knights Templar': L.marker(latlng, {
      icon: L.divIcon({
        html: ReactDOMServer.renderToString(<Icon icon={ICONS.MONASTERY} />),
      }),
    }),
  };
  return (
    orderType[properties.order] ||
    L.marker(latlng, {
      icon: L.divIcon({
        html: ReactDOMServer.renderToString(
          <Icon icon={ICONS.MONASTERY} color="#0000ff" />
        ),
      }),
    })
  );
};

export default setMarker;
