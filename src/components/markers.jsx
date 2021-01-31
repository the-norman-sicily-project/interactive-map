import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { Marker, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import _ from 'lodash';
import Icon from '../icons';
import SitePopup from '../containers/site_popup';
import { orderColorLookup } from '../utils';
import './markers.css';

const markerIcon = (feature) => {
  const size = 30;
  const order = _.get(feature, 'properties.nsp_monasticIdentity') || '';
  const normalizedOrder = order.toLowerCase().replace(/ /g, '_');
  const color = orderColorLookup(normalizedOrder);

  return L.divIcon({
    className: 'place-marker',
    html: ReactDOMServer.renderToString(
      <Icon
        placetype={_.get(feature, 'properties.nsp_placeType')}
        order={order}
        fill={color}
        width={`${size}px`}
        height={`${size}px`}
      />,
    ),
  });
};

const getTooltipText = (itLabel, enLabel) => {
  if (itLabel && itLabel.length > 0 && enLabel && enLabel.length > 0) {
    return `${itLabel} (${enLabel})`;
  }
  if (itLabel && itLabel.length > 0) {
    return itLabel;
  }
  if (enLabel && enLabel.length > 0) {
    return enLabel;
  }
  return 'Unknown';
};

const Markers = ({ handleMouseOver, handleMouseOut, sites, place }) => {
  const markersMarkup = sites.map((feature) => {
    const {
      labels: { en: enLabel, it: itLabel },
      iri,
      nsp_id,
      nsp_placeType,
      position,
    } = feature.properties;
    if (position) {
      return (
        <Marker
          key={iri}
          position={position}
          icon={markerIcon(feature)}
          data={{ iri, id: nsp_id, type: nsp_placeType }}
          eventHandlers={{
            mouseover: (e) => handleMouseOver(e),
            mouseout: (e) => handleMouseOut(e),
          }}>
          {place && <SitePopup />}
          <Tooltip>
            {/* eslint-disable camelcase */}
            <div className="popup-container">
              <div className="popup-content">{getTooltipText(itLabel, enLabel)}</div>
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
  sites: PropTypes.arrayOf(PropTypes.object),
  handleMouseOut: PropTypes.func.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  place: PropTypes.shape({}),
};

Markers.defaultProps = {
  place: null,
  sites: [],
};

export default Markers;
