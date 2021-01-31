import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { GeoSearchControl } from 'leaflet-geosearch';
import { useTranslate } from 'react-redux-multilingual';

const SearchControl = (props) => {
  const translate = useTranslate();
  const map = useMap();
  const { provider } = props;

  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider,
      resultFormat: (result) => (result && result.label ? `${result.label}` : ''),
      searchLabel: translate('searchPrompt'),
      showMarker: true,
      showPopup: false,
      popupFormat: (result) => (result && result.label ? `${result.label}` : ''),
      maxSuggestions: 10,
      keepResult: true,
      autoClose: true,
      updateMap: true,
      position: 'topright',
      style: 'bar',
    });

    map.addControl(searchControl);
    const containerDiv = searchControl.getContainer();
    L.DomEvent.disableClickPropagation(containerDiv);

    return () => map.removeControl(searchControl);
  }, [translate, map, provider]);

  return null;
};
export default SearchControl;
