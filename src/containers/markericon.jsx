import React from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import Icon from '../components/icon';
import { placeTypeLookup, orderLookup } from './utils';

// Using L because a component returns React.createElement() instead of L.geoJSON(..., { pointToLayer }
// Reference: https://github.com/PaulLeCam/react-leaflet/issues/234

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
          icon={setProps.icon}
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
