/* eslint class-methods-use-this: ["error", { "exceptMethods": ["parse"] }] */
import { JsonProvider } from 'leaflet-geosearch';
import config from '../config';

class SearchProvider extends JsonProvider {
  endpoint({ query, type }) {
    return this.getUrl(`https://${config.apiHost}:${config.apiPort}/names`, {
      q: query,
      f: 'json',
    });
  }

  parse({ data }) {
    return data.reduce((accumulator, value) => {
      const { rdfs_label, wgs_long, wgs_lat } = value;

      if (Array.isArray(rdfs_label)) {
        for (const label of rdfs_label) {
          accumulator.push({
            x: wgs_long,
            y: wgs_lat,
            label,
          });
        }
      } else {
        accumulator.push({
          x: wgs_long,
          y: wgs_lat,
          label: rdfs_label,
        });
      }
      return accumulator;
    }, []);
  }
}

export default SearchProvider;
