import { connect } from 'react-redux';
import Legend from '../components/legend';
import { legendSelector } from '../selectors';

const mapStateToProps = (state) => {
  const { loading, sites } = legendSelector(state);
  return {
    loading,
    sites,
  };
};

const LegendContainer = connect(mapStateToProps)(Legend);

export default LegendContainer;
