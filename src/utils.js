export const orderColorLookup = (order) => {
  switch (order) {
    case 'augustinian_canons':
      return '#969CA1';

    case 'basilians':
      return '#6f93ad';

    case 'basilians_then_cistercians':
      return '#38e3df';

    case 'benedictines':
      return '#c683ea';

    case 'cistercians':
      return '#d688aa';

    case 'cluniacs':
      return '#e77a68';

    case 'hospital_of_saint_lazarus_of_jerusalem':
      return '#73b961';

    case 'knights_of_the_hospital_of_saint_lazarus_at_jerusalem':
      return '#eda268';

    case 'knights_of_the_hospital_of_saint_john_of_jerusalem':
      return '#6795fe';

    case 'knights_templar':
      return '#ffff00';

    case 'premonstratensian_canons':
      return '#ff76b8';

    default:
      return '#000';
  }
};

export const getListOfOrders = (sites = []) => {
  const ordersSet = sites.reduce((accumulator, currentValue) => {
    if (currentValue.properties.nsp_monasticIdentity && currentValue.properties.nsp_monasticIdentity.length > 0) {
      const m = currentValue.properties.nsp_monasticIdentity;
      if (!m.endsWith('?') && !accumulator.has(m)) {
        accumulator.add(m);
      }
    }

    return accumulator;
  }, new Set([]));

  if (!ordersSet.has('UNKNOWN')) {
    ordersSet.add('UNKNOWN');
  }

  return [...ordersSet].sort((a, b) => a.localeCompare(b));
};

export const getPlaceTypes = (sites = []) => {
  const placeTypeSet = sites.reduce((accumulator, currentValue) => {
    if (currentValue.properties.nsp_placeType && currentValue.properties.nsp_placeType.length > 0) {
      const m = currentValue.properties.nsp_placeType;
      if (!m.endsWith('?') && !accumulator.has(m)) {
        accumulator.add(m);
      }
    }

    return accumulator;
  }, new Set([]));

  return [...placeTypeSet].sort((a, b) => a.localeCompare(b));
};

// source: http://en.marnoto.com/2014/04/converter-coordenadas-gps.html
export const getDms = (val) => {
  const result = [];
  const v = Math.abs(val);

  const deg = Math.floor(v);
  result.push(`${deg}º`);

  const min = Math.floor((v - deg) * 60);
  result.push(`${min}'`);

  const sec = Math.round((v - deg - min / 60) * 3600 * 1000) / 1000;
  result.push(`${sec}"`);

  return result;
};

// source: http://en.marnoto.com/2014/04/converter-coordenadas-gps.html
export const ddToDms = ({ lat, lng }) => {
  const latResult = [];
  latResult.push(lat >= 0 ? 'N' : 'S');

  const lngResult = [];
  lngResult.push(lng >= 0 ? 'E' : 'W');

  return `${lngResult.concat(getDms(lng)).join(' ')} ${latResult.concat(getDms(lat)).join(' ')}`;
};

export const startCaseTerm = (t = '') => {
  const trimmedTerm = t.trim();
  return trimmedTerm.charAt(0).toUpperCase() + trimmedTerm.slice(1);
};

export const startCaseList = (l = [], d = ',') => {
  const words = Array.isArray(l) ? l : l.split(d);
  return words.map((word) => startCaseTerm(word)).join(', ');
};

const getQuery = () => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

const getQueryStringValue = (key = null) => getQuery().get(key);

export const getQueryParam = (key, defaultVal) => getQueryStringValue(key) || defaultVal;
