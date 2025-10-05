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
        // Handle GeoJSON format from Redux store
        const { geometry, properties } = place;
        const coordinates = geometry?.coordinates;

        // Only include places with valid coordinates
        if (!coordinates || coordinates.length < 2) {
          return false;
        }

        // Search in labels - now in properties.labels as an object
        if (properties?.labels) {
          // Labels are transformed to {en: "Label", it: "Label"} format
          if (typeof properties.labels === 'object') {
            return Object.values(properties.labels).some((label) => label.toLowerCase().includes(searchTerm));
          }
          // Fallback for array format
          if (Array.isArray(properties.labels)) {
            return properties.labels.some((label) => {
              const labelText = label.includes(',')
                ? label.substring(label.indexOf(',') + 1).toLowerCase()
                : label.toLowerCase();
              return labelText.includes(searchTerm);
            });
          }
        }

        return false;
      })
      .map((place) => {
        const lat = place.geometry.coordinates[1];
        const lng = place.geometry.coordinates[0];
        return {
          x: lng, // longitude
          y: lat, // latitude
          label: this.getDisplayLabel(place),
          raw: place,
        };
      });

    return Promise.resolve(results);
  };

  getAllPlacesWithCoordinates = () =>
    this.places
      .filter((place) => {
        const coordinates = place.geometry?.coordinates;
        return coordinates && coordinates.length >= 2;
      })
      .map((place) => ({
        x: place.geometry.coordinates[0], // longitude
        y: place.geometry.coordinates[1], // latitude
        label: this.getDisplayLabel(place),
        raw: place,
      }));

  getDisplayLabel = (place) => {
    // Handle GeoJSON format from Redux store
    const properties = place.properties || place;

    // Check if labels are in transformed object format {en: "Label", it: "Label"}
    if (properties.labels && typeof properties.labels === 'object' && !Array.isArray(properties.labels)) {
      // Prefer English label, fallback to first available
      return properties.labels.en || Object.values(properties.labels)[0] || 'Unknown';
    }

    // Handle original array format ["en,Label", "it,Label"]
    if (properties.labels && Array.isArray(properties.labels) && properties.labels.length > 0) {
      // Prefer English labels (those starting with "en,")
      const englishLabel = properties.labels.find((label) => label.startsWith('en,'));
      if (englishLabel) {
        return englishLabel.substring(3); // Remove "en," prefix
      }
      // Fall back to first available label
      const firstLabel = properties.labels[0];
      if (firstLabel.includes(',')) {
        return firstLabel.substring(firstLabel.indexOf(',') + 1);
      }
      return firstLabel;
    }

    return properties.nsp_id || 'Unknown';
  };
}

export default SearchProvider;
