import React from 'react';
import { Pane } from 'react-leaflet';
import { getListOfOrders, orderLookup } from '../containers/utils';
import geojson from '../data/geojson';

const orderList = getListOfOrders(geojson);
const makeOrderList = orderList.map(order => (
  <li key={order}>
    <span
      style={{ background: Object.values(orderLookup(order)).toString() }}
    />
    {order}
  </li>
));

const Legend = () => (
  <Pane>
    <div className="my-legend">
      <div className="legend-title">Map Legend</div>
      <div className="legend-scale">
        <ul className="legend-labels">{makeOrderList}</ul>
      </div>
    </div>
  </Pane>
);

export default Legend;
