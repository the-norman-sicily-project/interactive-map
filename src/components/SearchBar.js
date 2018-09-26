import { withLeaflet } from 'react-leaflet';
import { GeoSearchControl } from 'leaflet-geosearch';
import { MapControl } from 'react-leaflet';
import SearchProvider from '../containers/SearchProvider';

class Search extends MapControl {
  createLeafletElement() {
    return GeoSearchControl({
      provider: new SearchProvider(),
      autoClose: true,
      showPopup: true,
      searchLabel: 'search',
    });
  }
}

export const SearchBar = withLeaflet(Search);