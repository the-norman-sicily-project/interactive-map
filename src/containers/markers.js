import { connect } from 'react-redux';
import Markers from '../components/markers';
import { markersSelector } from '../selectors';
// import { setSelectedPlace, clearSelectedPlace } from '../actions';
import { setSelectedPlace } from '../actions';

const mapStateToProps = (state) => {
  const { sites, place } = markersSelector(state);
  return {
    sites,
    place,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleMouseOver: (e) => {
    const { iri, id, type } = e.target.options.data;
    dispatch(setSelectedPlace(iri, id, type));
  },
  handleMouseOut: () => {
    // dispatch(clearSelectedPlace());
  },
});

const MarkersContainer = connect(mapStateToProps, mapDispatchToProps)(Markers);

export default MarkersContainer;
