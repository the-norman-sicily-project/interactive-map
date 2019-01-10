import React from 'react';
import { Pane } from 'react-leaflet';

const Legend = () => (
  <Pane>
    <div className="my-legend">
      <div className="legend-title">Map Legend</div>
      <div className="legend-scale">
        <ul className="legend-labels">
          <li>
            <span style={{ backgroundColor: 'red' }} />
            Augustinian Canons
          </li>
          <li>
            <span style={{ backgroundColor: 'blue' }} />
            Basilian
          </li>
          <li>
            <span style={{ backgroundColor: 'yellow' }} />
            Benedictine
          </li>
          <li>
            <span style={{ backgroundColor: 'purple' }} />
            Cistercian
          </li>
          <li>
            <span style={{ backgroundColor: 'orange' }} />
            Cluniac
          </li>
          <li>
            <span style={{ backgroundColor: 'brown' }} />
            Knights Templar
          </li>
          <li>
            <span style={{ backgroundColor: 'green' }} />
            Knights of the Hospital of Saint John of Jerusalem
          </li>
          <li>
            <span style={{ backgroundColor: 'black' }} />
            Unknown
          </li>
        </ul>
      </div>
    </div>
  </Pane>
);
export default Legend;
