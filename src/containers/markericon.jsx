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
      return { color: 'blue', scale: '1,-1', translate: '-6,-41' };

    case 'Augustinian Canons':
      return { color: 'red', scale: '1,-1', translate: '-6,-41' };

    case 'Knights of the Hospital of Saint John of Jerusalem':
      return { color: 'green', scale: '1,-1', translate: '-6,-41' };

    case 'Benedictine':
      return { color: 'yellow', scale: '1,-1', translate: '-6,-41' };

    case 'Cistercian':
      return { color: 'purple', scale: '1,-1', translate: '-6,-41' };

    case 'Cluniac':
      return { color: 'orange', scale: '1,-1', translate: '-6,-41' };

    case 'Knights Templar':
      return { color: 'brown', scale: '1,-1', translate: '-6,-41' };

    default: {
      return Icon.defaultProps;
    }
  }
};
const setMarker = ({ properties: { order } }, latlng) => {
  const setProps = Object.assign({}, Icon.defaultProps, orderLookup(order));
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
