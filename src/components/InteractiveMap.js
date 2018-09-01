import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import '../containers/App.css';
import '../data/geojson';
import { geojson } from '../data/geojson';
import MarkerClusterGroup from 'react-leaflet-markercluster';

class InteractiveMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [37.73, 14.2],
      zoom: 8,
      maxZoom: 18
    };
  }
  render() {
    return (
      <div>
        <Map center={this.state.center} zoom={this.state.zoom} maxZoom={this.state.maxZoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MarkerClusterGroup>
            <GeoJSON data={geojson} />
          </MarkerClusterGroup>
        </Map>
      </div>
    );
  }
}

export default InteractiveMap;
