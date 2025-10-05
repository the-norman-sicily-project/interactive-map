import { connect } from 'react-redux';
import ResourcePage from '../components/resource_page';

const mapStateToProps = (state) => ({
  currentPlace: state.map.currentPlace,
  loadingCurrentPlace: state.map.loadingCurrentPlace,
  currentLocale: state.Intl.locale,
});

export default connect(mapStateToProps)(ResourcePage);
