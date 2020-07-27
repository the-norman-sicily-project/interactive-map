import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import _ from 'lodash';
import Icon from '../icons';
import SitePopup from './site_popup';
import { orderColorLookup } from '../utils';
import './markers.css';

const markerIcon = feature => {
  const size = 30;
  const order = _.get(feature, 'properties.order') || '';
  const color = orderColorLookup(order);

  return L.divIcon({
    className: 'place-marker',
    html: ReactDOMServer.renderToString(
      <Icon
        placetype={_.get(feature, 'properties.place_type')}
        order={order}
        fill={color}
        width={`${size}px`}
        height={`${size}px`}
      />
    ),
  });
};

const handleMarkerClick = async marker => {
  const feature = _.get(marker, 'target.options.data');
  if (feature) {
    ReactDOM.render(
      <SitePopup feature={feature} />,
      document.getElementById('feature-popup')
    );
  }
};

const Markers = ({ sites = [] }) => {
  const markersMarkup = sites.map(feature => {
    const coordinates = _.get(feature, 'geometry.coordinates');
    if (coordinates) {
      const { english_place_name, italian_place_name } = feature.properties;
      return (
        <Marker
          key={feature.id}
          position={coordinates.reverse()} // argh!
          icon={markerIcon(feature)}
          data={feature} // this.ends up in marker.target.options.data
          onClick={marker => handleMarkerClick(marker)}
        >
          <Popup minWidth="662" maxWidth="662" className="leaflet_popup">
            <div id="feature-popup" />
          </Popup>
          <Tooltip>
            {/* eslint-disable camelcase */}
            <div className="popup-container">
              <div className="popup-content">
                {`${italian_place_name} (${english_place_name})`}
              </div>
            </div>
            {/* eslint-enable camelcase */}
          </Tooltip>
        </Marker>
      );
    }
    return null;
  });

  return <MarkerClusterGroup>{markersMarkup}</MarkerClusterGroup>;
};

Markers.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Markers;
