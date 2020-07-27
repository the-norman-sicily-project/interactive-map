import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from 'react-leaflet';
import { getPlaceTypes, getListOfOrders, orderColorLookup } from '../utils';
import Icon from '../icons';
import './legend.css';

const Legend = ({ sites, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  const size = 25;
  const orderList = getListOfOrders(sites);
  const orderMarkup = orderList.map(order => (
    <li key={order}>
      <div className="legend-item">
        <Icon
          placetype="monastery"
          order={order}
          fill={orderColorLookup(order)}
          width={`${size}px`}
          height={`${size}px`}
        />
        <div className="label-text">{order}</div>
      </div>
    </li>
  ));

  const placeTypes = getPlaceTypes(sites);
  const placeTypeMarkup = placeTypes.map(placeType => (
    <li key={placeType}>
      {placeType === 'monastery' ? (
        <>
          <div className="legend-sublist-title">Monastic Sites</div>
          <ul>{orderMarkup}</ul>
        </>
      ) : (
        <div className="legend-item">
          <Icon
            placetype={placeType}
            order={null}
            fill="#000"
            width={`${size}px`}
            height={`${size}px`}
          />
          <div className="label-text">{placeType}</div>
        </div>
      )}
    </li>
  ));
  return (
    <Pane>
      <div className="map-legend">
        <div className="legend-title">The Landscape of Norman Sicily</div>
        <div className="legend-scale">
          <ul className="legend-labels">{placeTypeMarkup}</ul>
        </div>
      </div>
    </Pane>
  );
};

Legend.propTypes = {
  loading: PropTypes.bool.isRequired,
  sites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Legend;
