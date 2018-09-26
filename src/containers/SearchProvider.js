import { geojson } from '../data/geojson';

class SearchProvider {
  async search({ query }) {
    let lowerCaseQuery = query.toLowerCase();
    let matches = geojson.features.filter(
      feature =>
        feature.geometry &&
        feature.geometry.coordinates &&
        feature.geometry.coordinates.length >= 2 &&
        feature.properties.english_place_name
          .toLowerCase()
          .indexOf(lowerCaseQuery) > -1
    );

    if (matches && matches.length > 0) {
      return matches.map(feature => ({
        x: feature.geometry.coordinates[0],
        y: feature.geometry.coordinates[1],
        label: feature.properties.english_place_name,
      }));
    } else {
      return [];
    }
  }
}

export default SearchProvider;
