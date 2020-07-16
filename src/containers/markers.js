import { connect } from 'react-redux';
import Markers from '../components/markers';
import { getSitesState } from '../selectors';

const mapStateToProps = state => {
  return {
    sites: getSitesState(state),
  };
};

const MarkersContainer = connect(mapStateToProps)(Markers);

export default MarkersContainer;
