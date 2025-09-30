/* eslint class-methods-use-this: ["error", { "exceptMethods": ["parse", "search"] }] */

class SearchProvider {
  constructor(places = []) {
    this.places = places;
  }

  search = async (query) => {
    if ('data' in query) {
      return Promise.resolve([query.data]);
    }

    const { query: q } = query;

    // Return empty results for very short queries
    if (!q || q.length < 2) {
      return Promise.resolve([]);
    }

    // If no query, return all places with coordinates
    if (q.length === 0) {
      return this.getAllPlacesWithCoordinates();
    }

    // Search through places data
    const searchTerm = q.toLowerCase().trim();
    const results = this.places
      .filter((place) => {
        // Only include places with valid coordinates
        if (!place.wgs_lat || !place.wgs_long) {
          return false;
        }

        // Search in labels
        if (place.labels && Array.isArray(place.labels)) {
          return place.labels.some((label) => {
            const labelText = label.toLowerCase();
            return labelText.includes(searchTerm);
          });
        }

        return false;
      })
      .map((place) => ({
        x: place.wgs_lat,
        y: place.wgs_long,
        label: this.getDisplayLabel(place),
        raw: place,
      }));

    return Promise.resolve(results);
  };

  getAllPlacesWithCoordinates = () =>
    this.places
      .filter((place) => place.wgs_lat && place.wgs_long)
      .map((place) => ({
        x: place.wgs_lat,
        y: place.wgs_long,
        label: this.getDisplayLabel(place),
        raw: place,
      }));

  getDisplayLabel = (place) => {
    if (place.labels && Array.isArray(place.labels) && place.labels.length > 0) {
      // Prefer English labels (those starting with "en,")
      const englishLabel = place.labels.find((label) => label.startsWith('en,'));
      if (englishLabel) {
        return englishLabel.substring(3); // Remove "en," prefix
      }
      // Fall back to first available label
      const firstLabel = place.labels[0];
      if (firstLabel.includes(',')) {
        return firstLabel.substring(firstLabel.indexOf(',') + 1);
      }
      return firstLabel;
    }
    return place.nsp_id || 'Unknown';
  };
}

export default SearchProvider;
