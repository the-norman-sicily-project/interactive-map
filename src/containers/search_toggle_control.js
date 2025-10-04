import { connect } from 'react-redux';
import SearchToggleControl from '../components/SearchToggleControl';
import { sitesSelector } from '../selectors';
import SearchProvider from '../providers/search';

const mapStateToProps = (state) => {
  const sites = sitesSelector(state);
  const searchProvider = new SearchProvider(sites);

  return {
    provider: searchProvider,
  };
};

const SearchToggleControlContainer = connect(mapStateToProps)(SearchToggleControl);

export default SearchToggleControlContainer;
