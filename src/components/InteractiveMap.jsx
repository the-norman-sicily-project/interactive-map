import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import SearchBar from './SearchBar';
import geojson from '../data/geojson';
import CONFIG from '../containers/Config';
import API_KEY from '../containers/ApiKey';
import setMarker from '../containers/markericon';
import '../containers/App.css';

class InteractiveMap extends Component {
  constructor(props) {
    super(props);
    this.onEachFeature = this.onEachFeature.bind(this);
    this.pointToLayer = this.pointToLayer.bind(this);
  }

  onEachFeature = (feature, layer) => {
    layer.bindPopup(feature.properties.english_place_name);
  };

  pointToLayer = (feature, latlng) => setMarker(feature, latlng);

  render() {
    return (
      <div>
        <Map
          center={CONFIG.centerPoint}
          zoom={CONFIG.initialZoom}
          maxZoom={CONFIG.maxZoom}
        >
          <TileLayer
            url={CONFIG.tileURL + API_KEY.MAPBOX_ACCESS_TOKEN}
            attribution={CONFIG.mapAttribution}
          />
          <MarkerClusterGroup>
            <GeoJSON
              data={geojson}
              onEachFeature={this.onEachFeature}
              pointToLayer={this.pointToLayer}
            />
          </MarkerClusterGroup>
          <SearchBar />
        </Map>
      </div>
    );
  }
}

export default InteractiveMap;
