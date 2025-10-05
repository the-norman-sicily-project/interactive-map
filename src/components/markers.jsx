import React, { useMemo, useCallback, memo } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { Marker, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import _ from 'lodash';
import Icon from '../icons';
import SitePopup from '../containers/site_popup';
import { orderColorLookup } from '../utils';

import 'react-leaflet-markercluster/dist/styles.min.css';
import './markers.css';

// Memoized icon creation to prevent recreation on every render
const createMarkerIcon = (() => {
  const iconCache = new Map();

  return (feature) => {
    const size = 30;
    const order = _.get(feature, 'properties.nsp_monasticIdentity') || '';
    const placeType = _.get(feature, 'properties.nsp_placeType');
    const normalizedOrder = order.toLowerCase().replace(/ /g, '_');
    const color = orderColorLookup(normalizedOrder);

    // Create cache key based on icon properties
    const cacheKey = `${placeType}-${normalizedOrder}-${color}`;

    if (iconCache.has(cacheKey)) {
      return iconCache.get(cacheKey);
    }

    const icon = L.divIcon({
      className: 'place-marker',
      html: ReactDOMServer.renderToString(
        <Icon placetype={placeType} order={order} fill={color} width={`${size}px`} height={`${size}px`} />,
      ),
    });

    iconCache.set(cacheKey, icon);
    return icon;
  };
})();

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

const Markers = memo(({ handleMouseOver, handleMouseOut, sites, place }) => {
  // Memoize event handlers to prevent recreation on every render
  const createEventHandlers = useCallback(
    (feature) => ({
      mouseover: (e) => handleMouseOver(e),
      mouseout: (e) => handleMouseOut(e),
    }),
    [handleMouseOver, handleMouseOut],
  );

  // Memoize the markers markup to prevent unnecessary re-renders
  const markersMarkup = useMemo(
    () =>
      sites
        .map((feature) => {
          const {
            labels: { en: enLabel, it: itLabel } = {},
            iri,
            nsp_id,
            nsp_placeType,
            position,
          } = feature.properties || {};

          if (!position) {
            return null;
          }

          const tooltipText = getTooltipText(itLabel, enLabel);
          const icon = createMarkerIcon(feature);
          const eventHandlers = createEventHandlers(feature);

          return (
            <Marker
              key={iri}
              position={position}
              icon={icon}
              data={{ iri, id: nsp_id, type: nsp_placeType }}
              eventHandlers={eventHandlers}
            >
              {place && <SitePopup />}
              <Tooltip>
                <div className="popup-container">
                  <div className="popup-content">{tooltipText}</div>
                </div>
              </Tooltip>
            </Marker>
          );
        })
        .filter(Boolean), // Remove null entries
    [sites, place, createEventHandlers],
  );

  return <MarkerClusterGroup>{markersMarkup}</MarkerClusterGroup>;
});

Markers.displayName = 'Markers';

Markers.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.shape({})), // eslint-disable-line react/forbid-prop-types
  handleMouseOut: PropTypes.func.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  place: PropTypes.shape({}),
};

Markers.defaultProps = {
  place: null,
  sites: [],
};

export default Markers;
