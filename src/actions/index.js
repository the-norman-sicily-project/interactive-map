export const INIT_MAP = 'INIT_MAP';
export const LOAD_SITES_BEGIN = 'LOAD_SITES_BEGIN';
export const LOAD_SITES_SUCCESS = 'LOAD_SITES_SUCCESS';
export const LOAD_SITES_FAILURE = 'LOAD_SITES_FAILURE';
// export const CLEAR_SELECTED_PLACE = 'CLEAR_SELECTED_PLACE';
export const SET_SELECTED_PLACE = 'SET_SELECTED_PLACE';
export const FETCH_PLACE_BEGIN = 'FETCH_PLACE_BEGIN';
export const FETCH_PLACE_SUCCESS = 'FETCH_PLACE_SUCCESS';
export const FETCH_PLACE_FAILURE = 'FETCH_PLACE_FAILURE';

export const initMap = () => ({
  type: INIT_MAP,
});

export const loadSitesBegin = () => ({
  type: LOAD_SITES_BEGIN,
});

export const loadSitesSuccess = (result) => ({
  type: LOAD_SITES_SUCCESS,
  places: result,
});

export const loadSitesFailure = (error) => ({
  type: LOAD_SITES_FAILURE,
  error,
});

// export const clearSelectedPlace = () => {
//   return {
//     type: CLEAR_SELECTED_PLACE,
//   }
// };

export const setSelectedPlace = (placeIri, placeId, placeType) => ({
  type: SET_SELECTED_PLACE,
  place: { placeIri, placeId, placeType },
});

export const fetchPlaceBegin = () => ({
  type: FETCH_PLACE_BEGIN,
});

export const fetchPlaceSuccess = (result) => ({
  type: FETCH_PLACE_SUCCESS,
  place: Array.isArray(result) ? result[0] : result,
});

export const fetchPlaceFailure = (error) => ({
  type: FETCH_PLACE_FAILURE,
  error,
});
