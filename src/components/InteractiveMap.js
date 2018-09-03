import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import '../containers/App.css';
import '../data/geojson';
import { geojson } from '../data/geojson';
import MarkerClusterGroup from 'react-leaflet-markercluster';

class InteractiveMap extends Component {
  constructor(props) {
    super(props);
    this.onEachFeature = this.onEachFeature.bind(this);
    this.state = {
      center: [37.73, 14.2],
      zoom: 8,
      maxZoom: 18,
    };
  }
  onEachFeature = (feature, layer) => {
    layer.bindPopup(feature.properties.english_place_name);
  };
  render() {
    return (
      <div>
        <Map
          center={this.state.center}
          zoom={this.state.zoom}
          maxZoom={this.state.maxZoom}
        >
          <TileLayer
            url="http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg"
            attribution="Map tiles by <a href=&quot;http://stamen.com&quot;>Stamen Design</a>, under <a href=&quot;http://creativecommons.org/licenses/by/3.0&quot;>CC BY 3.0</a>. Data by <a href=&quot;http://openstreetmap.org&quot;>OpenStreetMap</a>, under <a href=&quot;http://www.openstreetmap.org/copyright&quot;>ODbL</a>."
          />
          <MarkerClusterGroup>
            <GeoJSON data={geojson} onEachFeature={this.onEachFeature} />
          </MarkerClusterGroup>
        </Map>
      </div>
    );
  }
}

export default InteractiveMap;
