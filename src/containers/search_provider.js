const stripDiacritics = s => {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

class SearchProvider {
  constructor(sites) {
    this.sites = (sites || [])
      .filter(feature => {
        return (
          feature.geometry &&
          feature.geometry.coordinates &&
          feature.geometry.coordinates.length >= 2 &&
          feature.properties &&
          feature.properties.english_place_name
        );
      })
      .map(feature => ({
        x: feature.geometry.coordinates[1],
        y: feature.geometry.coordinates[0],
        label: feature.properties.english_place_name,
      }));
  }

  async search({ query }) {
    const re = new RegExp(stripDiacritics(query), 'gi');
    return this.sites.filter(feature => {
      return re.test(stripDiacritics(feature.label));
    });
  }
}

export default SearchProvider;
