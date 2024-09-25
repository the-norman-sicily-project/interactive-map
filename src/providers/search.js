/* eslint class-methods-use-this: ["error", { "exceptMethods": ["parse"] }] */
import { JsonProvider } from 'leaflet-geosearch';
import config from '../config';

class SearchProvider extends JsonProvider {
  endpoint({ query, type }) {
    return this.getUrl(`${config.apiProtocol}://${config.apiHost}:${config.apiPort}/names`, {
      q: query,
      f: 'json',
    });
  }

  search = (query) => {
    if ('data' in query) {
      return Promise.resolve([query.data]);
    }
    const { query: q } = query;
    if (q && q.length < 3) {
      return Promise.resolve([]);
    }
    return super.search(query);
  };

  parse = ({ data }) => {
    if (data && Array.isArray(data)) {
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
    return [];
  };
}

export default SearchProvider;
