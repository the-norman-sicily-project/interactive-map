import { connect } from 'react-redux';
import MapLayers from '../components/map_layers';

const mapStateToProps = state => {
  return {
    loading: state.loading,
  };
};

const MapLayersContainer = connect(mapStateToProps)(MapLayers);

export default MapLayersContainer;
