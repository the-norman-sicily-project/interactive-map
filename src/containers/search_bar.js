import { connect } from 'react-redux';
import SearchBar from '../components/search_bar';
import { sitesSelector } from '../selectors';
import SearchProvider from '../providers/search';

const mapStateToProps = (state) => {
  const sites = sitesSelector(state);
  const searchProvider = new SearchProvider(sites);

  return {
    provider: searchProvider,
  };
};

const SearchBarContainer = connect(mapStateToProps)(SearchBar);

export default SearchBarContainer;
