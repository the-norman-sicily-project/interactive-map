import { connect } from 'react-redux';
import InteractiveMap from '../components/interactive_map';
import { loadingSelector } from '../selectors';

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
});

const InteractiveMapContainer = connect(mapStateToProps)(InteractiveMap);

export default InteractiveMapContainer;
