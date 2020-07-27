export const orderColorLookup = order => {
  switch (order) {
    case 'Augustinian Canons':
      return '#969CA1';

    case 'Basilians':
      return '#6f93ad';

    case 'Basilians then Cistericans':
      return '#38e3df';

    case 'Benedictines':
      return '#c683ea';

    case 'Cistercians':
      return '#d688aa';

    case 'Cluniacs':
      return '#e77a68';

    case 'Knights of the Hospital of Saint Lazarus at Jerusalem':
      return '#eda268';

    case 'Knights of the Hospital of Saint John of Jerusalem':
      return '#6795fe';

    case 'Knights Templar':
      return '#ffff00';

    case 'Premonstratensian Canons':
      return '#ff76b8';

    default:
      return '#fff';
  }
};

export const getListOfOrders = (sites = []) => {
  const ordersSet = sites.reduce((accumulator, currentValue) => {
    if (
      currentValue.properties.order &&
      currentValue.properties.order.length > 0
    ) {
      const m = currentValue.properties.order;
      if (!m.endsWith('?') && !accumulator.has(m)) {
        accumulator.add(m);
      }
    }

    return accumulator;
  }, new Set(['Unknown']));
  return [...ordersSet].sort((a, b) => a.localeCompare(b));
};

export const getPlaceTypes = (sites = []) => {
  const placeTypeSet = sites.reduce((accumulator, currentValue) => {
    if (
      currentValue.properties.place_type &&
      currentValue.properties.place_type.length > 0
    ) {
      const m = currentValue.properties.place_type;
      if (!m.endsWith('?') && !accumulator.has(m)) {
        accumulator.add(m);
      }
    }

    return accumulator;
  }, new Set([]));

  return [...placeTypeSet].sort((a, b) => a.localeCompare(b));
};

// source: http://en.marnoto.com/2014/04/converter-coordenadas-gps.html
export const getDms = val => {
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

  return `${lngResult.concat(getDms(lng)).join(' ')} ${latResult
    .concat(getDms(lat))
    .join(' ')}`;
};

export const startCaseTerm = t => {
  return (
    t
      .trim()
      .charAt(0)
      .toUpperCase() + t.slice(1)
  );
};

export const startCaseList = (l, d = ',') => {
  const words = l.split(d);
  return words
    .map(word => {
      return startCaseTerm(word);
    })
    .join(', ');
};
