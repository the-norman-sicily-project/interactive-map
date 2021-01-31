import { connect } from 'react-redux';
import SitePopup from '../components/site_popup';
import { popupSelector } from '../selectors';

const mapStateToProps = (state) => {
  const { currentPlace, loadingCurrentPlace, currentLocale } = popupSelector(state);
  return {
    currentPlace,
    loadingCurrentPlace,
    currentLocale,
  };
};

const SitePopupContainer = connect(mapStateToProps)(SitePopup);

export default SitePopupContainer;
