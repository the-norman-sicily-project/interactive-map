import { connect } from 'react-redux';
import InteractiveMap from '../components/interactive_map';
import { getLoadingState } from '../selectors';

const mapStateToProps = state => {
  return {
    loading: getLoadingState(state),
  };
};

const InteractiveMapContainer = connect(mapStateToProps)(InteractiveMap);

export default InteractiveMapContainer;
