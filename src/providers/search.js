const stripDiacritics = (s) => {
  if (s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  return s;
};

class SearchProvider {
  constructor(sites = []) {
    this.sites = sites
      .filter((feature) => {
        const {
          labels: { en: enLabel },
          position,
        } = feature.properties;
        return position && enLabel;
      })
      .map((feature) => {
        const {
          labels: { en: enLabel, it: itLabel },
          position,
        } = feature.properties;
        return {
          x: position[1],
          y: position[0],
          label: `${enLabel}${itLabel ? ` (${itLabel})` : ''}`,
          raw: feature,
        };
      });
  }

  async search({ query }) {
    const re = new RegExp(stripDiacritics(query), 'gi');
    return this.sites.filter((site) => re.test(stripDiacritics(site.label)));
  }
}

export default SearchProvider;
