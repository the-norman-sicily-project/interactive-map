import ICONS from './icons';

export const orderLookup = order => {
  switch (order) {
    case 'Basilian':
      return { color: 'blue' };

    case 'Augustinian Canons':
      return { color: 'red' };

    case 'Knights of the Hospital of Saint John of Jerusalem':
      return { color: 'green' };

    case 'Benedictine':
      return { color: 'yellow' };

    case 'Cistercian':
      return { color: 'purple' };

    case 'Cluniac':
      return { color: 'orange' };

    case 'Knights Templar':
      return { color: 'brown' };

    case 'Premonstratensian Canons':
      return { color: 'aqua' };

    case 'Hospital of Saint Lazarus at Jerusalem':
      return { color: 'teal' };

    default:
      return {};
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
  }, new Set([]));
  return [...ordersSet];
};
