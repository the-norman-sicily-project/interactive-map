/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
import { useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useMap } from 'react-leaflet';
import { useEventHandlers } from '@react-leaflet/core';
import { GeoSearchControl } from 'leaflet-geosearch';
import { useTranslate } from 'react-redux-multilingual';
import L from 'leaflet';
import config from '../config';

import 'leaflet-geosearch/dist/geosearch.css';

const SearchControl = memo((props) => {
  const translate = useTranslate();
  const map = useMap();
  const { provider } = props;

  const findMarker = useCallback((latlng, layer) => {
    let marker;
    if (layer.getLayers) {
      const childLayers = layer.getLayers();
      for (let i = 0; i < childLayers.length; i++) {
        marker = findMarker(latlng, childLayers[i]);
        if (marker) break;
      }
    }
    if (layer.getLatLng) {
      if (latlng.equals(layer.getLatLng())) {
        marker = layer;
      }
    }
    return marker;
  }, []);

  const onShowLocation = useCallback(
    (e) => {
      const latlng = L.latLng(e.location.y, e.location.x);

      let marker;
      let foundMarker = false;
      map.eachLayer((layer) => {
        if ((layer instanceof L.MarkerClusterGroup || layer instanceof L.Marker) && !foundMarker) {
          marker = findMarker(latlng, layer);
          if (marker) {
            foundMarker = true;
          }
        }
      });

      if (marker) {
        let found = false;
        map.eachLayer((layer) => {
          if (!found) {
            if (layer.hasLayer) {
              if (layer.hasLayer(marker)) {
                layer.zoomToShowLayer(marker);
                found = true;
              }
            }
          }
        });
        if (!found) {
          map.setView(latlng, config.searchZoom);
        }

        marker.fireEvent('mouseover');
        marker.openTooltip();
      } else {
        map.setView(latlng, config.searchZoom);
      }
    },
    [map, findMarker],
  );

  useEventHandlers({ instance: map }, { 'geosearch/showlocation': onShowLocation });

  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider,
      searchLabel: translate('searchPrompt'),
      maxMarkers: 0,
      showMarker: false,
      showPopup: false,
      updateMap: false,
      autoClose: true,
      position: 'topright',
      style: 'bar',
      maxSuggestions: 25,
      keepResult: false,
      clearSearchOnBlur: true,
      animateZoom: false,
    });

    // Override the search control's showResult method to prevent marker management
    searchControl.showResult = (result, params) => {
      // Don't call the original showResult to avoid marker management issues
      // Just trigger our custom event
      map.fireEvent('geosearch/showlocation', {
        location: result,
        ...params,
      });
      return searchControl;
    };

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [translate, map, provider]);

  return null;
});

SearchControl.displayName = 'SearchControl';

SearchControl.propTypes = {
  provider: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default SearchControl;
