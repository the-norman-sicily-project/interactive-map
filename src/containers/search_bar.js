import { connect } from 'react-redux';
import SearchBar from '../components/search_bar';
import { getSitesState } from '../selectors';

const mapStateToProps = state => {
  return {
    sites: getSitesState(state),
  };
};

const SearchBarContainer = connect(mapStateToProps)(SearchBar);

export default SearchBarContainer;
