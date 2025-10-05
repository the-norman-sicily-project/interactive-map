import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSelectedPlace } from '../actions';
import ResourcePage from '../containers/resource_page';
import ErrorBoundary from './ErrorBoundary';

/**
 * ResourceLoader - Fetches and displays a single resource
 * Extracts placeType and placeId from URL params and loads the resource
 */
const ResourceLoader = ({ dispatchSetSelectedPlace }) => {
  const { type, id } = useParams();

  useEffect(() => {
    if (type && id) {
      // Dispatch action to load the place data
      const placeIri = `http://www.normansicily.org/nsp/place/${type}/${id}`;
      dispatchSetSelectedPlace(placeIri, id, type);
    }
  }, [type, id, dispatchSetSelectedPlace]);

  return (
    <ErrorBoundary
      title="Resource Loading Error"
      message="There was a problem loading the resource. Please check the URL and try again.">
      <ResourcePage />
    </ErrorBoundary>
  );
};

ResourceLoader.propTypes = {
  dispatchSetSelectedPlace: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetSelectedPlace: (placeIri, placeId, placeType) => dispatch(setSelectedPlace(placeIri, placeId, placeType)),
});

export default connect(null, mapDispatchToProps)(ResourceLoader);
