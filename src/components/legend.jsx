import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from 'react-leaflet';
import { getListOfOrders, orderLookup } from '../utils';

const Legend = ({ sites, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  const orderList = getListOfOrders(sites);
  const orderListMarkup = orderList.map(order => (
    <li key={order}>
      <span
        style={{ background: Object.values(orderLookup(order)).toString() }}
      />
      {order}
    </li>
  ));
  return (
    <Pane>
      <div className="map-legend">
        <div className="legend-scale">
          <ul className="legend-labels">{orderListMarkup}</ul>
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
