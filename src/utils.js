import icons from './icons';

export const orderLookup = order => {
  switch (order) {
    case 'Augustinian Canons':
      return { color: '#ba3d36' };

    case 'Basilians':
      return { color: '#ca8345' };

    case 'Benedictines':
      return { color: '#f9f9f9' };

    case 'Cistercians':
      return { color: '#cabfb3' };

    case 'Cluniacs':
      return { color: '#ffb404' };

    case 'Knights of the Hospital of Saint Lazarus at Jerusalem':
      return { color: '#837b52' };

    case 'Knights of the Hospital of Saint John of Jerusalem':
      return { color: '#617790' };

    case 'Knights Templar':
      return { color: '#8d8594' };

    case 'Premonstratensian Canons':
      return { color: '#423c46' };

    default:
      return { color: '#fbe5ba' };
  }
};

export const placeTypeLookup = placeType => {
  switch (placeType) {
    case 'monastery':
      return { icon: icons.MONASTERY, scale: '1,-1', translate: '-6,-41' };
    default: {
      return {};
    }
  }
};

export const getListOfOrders = sites => {
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

// source: http://en.marnoto.com/2014/04/converter-coordenadas-gps.html
const getDms = val => {
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

export const snakeCase2StartCase = s => {
  const words = s.split('_');
  return words
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

export const startCaseList = s => {
  const words = s.split(',');
  return words
    .map(word => {
      const trimmedWord = word.trim();
      return trimmedWord.charAt(0).toUpperCase() + trimmedWord.slice(1);
    })
    .join(', ');
};
