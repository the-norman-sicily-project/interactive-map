import ICONS from './icons';

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
      return { color: '#88868d' };
  }
};

export const placeTypeLookup = placeType => {
  switch (placeType) {
    case 'monastery':
      return { icon: ICONS.MONASTERY, scale: '1,-1', translate: '-6,-41' };
    default: {
      return {};
    }
  }
};

export const getListOfOrders = data => {
  const ordersSet = data.features.reduce((accumulator, currentValue) => {
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
