import { connect } from 'react-redux';
import { initMap } from '../actions';
import App from '../components/app';

const mapDispatchToProps = (dispatch) => ({
  initMap: () => {
    dispatch(initMap());
  },
});

export default connect(null, mapDispatchToProps)(App);
