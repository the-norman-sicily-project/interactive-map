import { connect } from 'react-redux';
import Legend from '../components/legend';
import { getLoadingState, getSitesState } from '../selectors';

const mapStateToProps = state => {
  return {
    loading: getLoadingState(state),
    sites: getSitesState(state),
  };
};

const LegendContainer = connect(mapStateToProps)(Legend);

export default LegendContainer;
