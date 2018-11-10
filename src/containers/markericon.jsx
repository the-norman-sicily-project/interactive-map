import React from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import Icon from '../components/icon';
import ICONS from './icons';

// Using L because a component returns React.createElement() instead of L.geoJSON(..., { pointToLayer }
// Reference: https://github.com/PaulLeCam/react-leaflet/issues/234

const orderLookup = order => {
  switch (order) {
    case 'Basilian':
      return { color: 'blue' };

    case 'Augustinian Canons':
      return { color: 'red' };

    case 'Knights of the Hospital of Saint John of Jerusalem':
      return { color: 'green' };

    case 'Benedictine':
      return { color: 'yellow' };

    case 'Cistercian':
      return { color: 'purple' };

    case 'Cluniac':
      return { color: 'orange' };

    case 'Knights Templar':
      return { color: 'brown' };

    default:
      return {};
  }
};
const placeTypeLookup = placeType => {
  switch (placeType) {
    case 'monastery':
      return { scale: '1,-1', translate: '-6,-41' };
    default: {
      return {};
    }
  }
};
const setMarker = (feature, latlng) => {
  const setProps = Object.assign(
    {},
    Icon.defaultProps,
    placeTypeLookup(feature.properties.place_type),
    orderLookup(feature.properties.order)
  );
  return L.marker(latlng, {
    icon: L.divIcon({
      html: ReactDOMServer.renderToString(
        <Icon
          icon={ICONS.MONASTERY}
          color={setProps.color}
          translate={setProps.translate}
          scale={setProps.scale}
          size={setProps.size}
        />
      ),
    }),
  });
};

export default setMarker;
