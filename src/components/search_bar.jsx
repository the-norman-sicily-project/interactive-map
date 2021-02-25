import { useEffect, useCallback } from 'react';
import { useMap } from 'react-leaflet';
import { useEventHandlers } from '@react-leaflet/core';
import { GeoSearchControl } from 'leaflet-geosearch';
import { useTranslate } from 'react-redux-multilingual';
import L from 'leaflet';
import config from '../config';

import 'leaflet-geosearch/dist/geosearch.css';

const SearchControl = (props) => {
  const translate = useTranslate();
  const map = useMap();
  const { provider } = props;

  const findMarker = (latlng, layer) => {
    if (layer.getLatLng) {
      if (latlng.equals(layer.getLatLng(), 1.0e-5) && layer.options.data.id !== undefined) {
        return layer;
      }
    }
    if (layer.getAllChildMarkers) {
      for (const marker of layer.getAllChildMarkers()) {
        if (latlng.equals(marker.getLatLng(), 1.0e-5) && marker.options.data.id !== undefined) {
          return marker;
        }
      }
    }
    return null;
  };

  const onShowLocation = useCallback(
    (e) => {
      const latlng = L.latLng(e.location.y, e.location.x);

      let marker;
      let foundMarker = false;
      map.eachLayer((layer) => {
        if (!foundMarker) {
          marker = findMarker(latlng, layer);
          if (marker) foundMarker = true;
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
    [map],
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
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [translate, map, provider]);

  return null;
};
export default SearchControl;
