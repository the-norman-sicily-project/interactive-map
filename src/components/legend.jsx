import React, { useMemo, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslate } from 'react-redux-multilingual';
import { getPlaceTypes, getListOfOrders, orderColorLookup } from '../utils';
import Icon from '../icons';
import './legend.css';

const Legend = memo(({ sites, loading }) => {
  const translate = useTranslate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Memoize legend data computation to prevent unnecessary recalculation
  const legendData = useMemo(() => {
    if (loading) return null;

    const size = 25;
    const orderList = getListOfOrders(sites);
    const placeTypes = getPlaceTypes(sites);

    const orderMarkup = orderList.map((order) => {
      const normalizedOrder = order.toLowerCase().replace(/ /g, '_');

      return (
        <li key={`monastic-identity-${order}`}>
          <div className="legend-item">
            <Icon
              placetype="monastery"
              order={normalizedOrder}
              fill={orderColorLookup(normalizedOrder)}
              width={`${size}px`}
              height={`${size}px`}
            />
            <div className="label-text" title={translate(normalizedOrder)}>
              {translate(normalizedOrder)}
            </div>
          </div>
        </li>
      );
    });

    const placeTypeMarkup = placeTypes.map((placeType) => (
      <li key={`place-type-${placeType}`}>
        {placeType === 'monastery' ? (
          <>
            <div className="legend-sublist-title">{translate('legendSublistTitleMonastic')}</div>
            <ul>{orderMarkup}</ul>
          </>
        ) : (
          <div className="legend-item">
            <Icon placetype={placeType} order={null} fill="#000" width={`${size}px`} height={`${size}px`} />
            <div className="label-text" title={placeType}>
              {placeType}
            </div>
          </div>
        )}
      </li>
    ));

    return { placeTypeMarkup };
  }, [sites, loading, translate]);

  if (loading) {
    return <div>{translate('loading')}</div>;
  }
  const toggleLegend = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="leaflet-control-container">
      <div className="leaflet-bottom leaflet-left">
        <div className="map-legend leaflet-control">
          <div className="legend-header">
            <div className="legend-title">{translate('legendTitle')}</div>
            <button
              type="button"
              className="legend-toggle"
              onClick={toggleLegend}
              aria-label={isCollapsed ? 'Show legend' : 'Hide legend'}
              title={isCollapsed ? 'Show legend' : 'Hide legend'}>
              {isCollapsed ? '▲' : '▼'}
            </button>
          </div>
          {!isCollapsed && (
            <div className="legend-scale">
              <ul className="legend-labels">{legendData?.placeTypeMarkup}</ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

Legend.displayName = 'Legend';

Legend.propTypes = {
  loading: PropTypes.bool,
  sites: PropTypes.arrayOf(PropTypes.shape({})), // eslint-disable-line react/forbid-prop-types
};

Legend.defaultProps = {
  sites: [],
  loading: false,
};

export default Legend;
