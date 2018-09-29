import { withLeaflet, MapControl } from 'react-leaflet';
import { GeoSearchControl } from 'leaflet-geosearch';
import geojson from '../data/geojson';
import SearchProvider from '../containers/SearchProvider';

class Search extends MapControl {
  createLeafletElement() {
    return GeoSearchControl({
      provider: new SearchProvider(geojson),
      autoClose: true,
      showPopup: true,
      searchLabel: 'search',
    });
  }
}

const SearchBar = withLeaflet(Search);
export default SearchBar;
