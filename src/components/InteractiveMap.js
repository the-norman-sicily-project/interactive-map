import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { geojson } from '../data/geojson';
import {
  centerPoint,
  tileURL,
  initialZoom,
  maxZoom,
  mapAttribution,
} from '../containers/MapConfig';
import '../containers/App.css';
import '../data/geojson';

class InteractiveMap extends Component {
  constructor(props) {
    super(props);
    this.onEachFeature = this.onEachFeature.bind(this);
  }
  onEachFeature = (feature, layer) => {
    layer.bindPopup(feature.properties.english_place_name);
  };
  render() {
    return (
      <div>
        <Map center={centerPoint} zoom={initialZoom} maxZoom={maxZoom}>
          <TileLayer url={tileURL} attribution={mapAttribution} />
          <MarkerClusterGroup>
            <GeoJSON data={geojson} onEachFeature={this.onEachFeature} />
          </MarkerClusterGroup>
        </Map>
      </div>
    );
  }
}

export default InteractiveMap;
