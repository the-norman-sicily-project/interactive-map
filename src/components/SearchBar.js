import { withLeaflet, MapControl } from 'react-leaflet';
import { GeoSearchControl } from 'leaflet-geosearch';
import geojson from '../data/geojson';
import SearchProvider from '../containers/SearchProvider';

class Search extends MapControl {
  initProvider() {
    this.provider = new SearchProvider(geojson);
  }

  createLeafletElement() {
    if (!this.provider) {
      this.initProvider();
    }

    return GeoSearchControl({
      provider: this.provider,
      autoClose: true,
      showPopup: true,
      searchLabel: 'search',
    });
  }
}

const SearchBar = withLeaflet(Search);
export default SearchBar;
