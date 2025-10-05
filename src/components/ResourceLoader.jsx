import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSelectedPlace } from '../actions';
import ResourcePage from './resource_page';
import ErrorBoundary from './ErrorBoundary';
import { getQueryParam } from '../utils';

/**
 * ResourceLoader - Fetches and displays a single resource
 * Extracts placeType and placeId from URL params and loads the resource
 * Supports locale via ?locale=it query parameter
 */
const ResourceLoader = ({ dispatchSetSelectedPlace, dispatchSetLocale, currentLocale }) => {
  const { type, id } = useParams();
  const location = useLocation();

  // Handle locale from query parameter
  useEffect(() => {
    const localeParam = getQueryParam('locale', null, location.search);
    if (localeParam && localeParam !== currentLocale) {
      dispatchSetLocale(localeParam);
    }
  }, [location.search, currentLocale, dispatchSetLocale]);

  // Load place data
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
  dispatchSetLocale: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentLocale: state.Intl.locale,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetSelectedPlace: (placeIri, placeId, placeType) => dispatch(setSelectedPlace(placeIri, placeId, placeType)),
  dispatchSetLocale: (locale) => dispatch({ type: 'SET_LOCALE', locale }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceLoader);
