import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useTranslate } from 'react-redux-multilingual';
import { getPlaceTypes, getListOfOrders, orderColorLookup } from '../utils';
import Icon from '../icons';
import './legend.css';

const Legend = ({ sites, loading }) => {
  const translate = useTranslate();

  if (loading) {
    return <div>{translate('loading')}</div>;
  }
  const size = 25;
  const orderList = getListOfOrders(sites);
  const orderMarkup = orderList.map((order) => {
    const normalizedOrder = order.toLowerCase().replace(/ /g, '_');

    return (
      <li key={_.uniqueId('monastic-identity')}>
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

  const placeTypes = getPlaceTypes(sites);
  const placeTypeMarkup = placeTypes.map((placeType) => (
    <li key={_.uniqueId('place-type')}>
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
  return (
    <div className="leaflet-control-container">
      <div className="leaflet-bottom leaflet-left">
        <div className="map-legend leaflet-control">
          <div className="legend-title">{translate('legendTitle')}</div>
          <div className="legend-scale">
            <ul className="legend-labels">{placeTypeMarkup}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Legend.propTypes = {
  loading: PropTypes.bool,
  sites: PropTypes.arrayOf(PropTypes.object),
};

Legend.defaultProps = {
  sites: [],
  loading: false,
};

export default Legend;
