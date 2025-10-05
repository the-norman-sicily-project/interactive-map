import { cloneDeep, getOr, set, unset, compose, isEqual } from 'lodash/fp';
import {
  INIT_MAP,
  LOAD_SITES_BEGIN,
  LOAD_SITES_SUCCESS,
  LOAD_SITES_FAILURE,
  // CLEAR_SELECTED_PLACE,
  FETCH_PLACE_BEGIN,
  FETCH_PLACE_FAILURE,
  FETCH_PLACE_SUCCESS,
} from '../actions';

export const initialState = {
  loading: false,
  loadingCurrentPlace: false,
  sites: [],
  currentPlace: {},
};

// GeoJSON constants
const GEOJSON_FEATURE_TYPE = 'Feature';
const GEOJSON_POINT_TYPE = 'Point';

const makeProperties = (props) => {
  const { labels, ...rest } = props;

  let processedLabels = {};

  if (Array.isArray(labels)) {
    processedLabels = labels.reduce((acc, curr) => {
      if (typeof curr === 'string' && curr.includes(',')) {
        const [lang, label] = curr.split(',');
        return { ...acc, [lang]: label };
      }
      return acc;
    }, {});
  } else if (labels) {
    processedLabels = { en: labels };
  }

  return { labels: processedLabels, ...rest };
};

const sparqljson2geojson = (places) => {
  if (!Array.isArray(places)) {
    return [];
  }

  return places
    .filter((place) => place && place.wgs_long != null && place.wgs_lat != null)
    .map(({ wgs_long, wgs_lat, wgs_alt, ...rest }) => ({
      type: GEOJSON_FEATURE_TYPE,
      geometry: {
        type: GEOJSON_POINT_TYPE,
        coordinates: wgs_alt != null ? [wgs_long, wgs_lat, wgs_alt] : [wgs_long, wgs_lat],
      },
      properties: {
        ...makeProperties(rest),
        position: [wgs_lat, wgs_long], // Leaflet expects [lat, lng] not GeoJSON [lng, lat]
      },
    }));
};

export const mapReducer = (state = initialState, action) => {
  const currentPlace = getOr({}, 'currentPlace', state);

  switch (action.type) {
    case INIT_MAP:
      return cloneDeep(state);
    case LOAD_SITES_BEGIN:
      return set('loading', true, state);
    case LOAD_SITES_SUCCESS:
      return compose(set('loading', false), set('sites', sparqljson2geojson(action.places)), unset('error'))(state);
    case LOAD_SITES_FAILURE:
      return compose(set('loading', false), set('error', action.error), set('sites', []))(state);
    // case CLEAR_SELECTED_PLACE:
    //   return state;
    //   // return compose(
    //   //   set('loadingCurrentPlace', false),
    //   //   set('currentPlace', {}),
    //   //   unset('error'),
    //   // )(state);
    case FETCH_PLACE_BEGIN:
      return set('loadingCurrentPlace', true, state);
    case FETCH_PLACE_SUCCESS:
      return !isEqual(currentPlace, action.place)
        ? compose(set('loadingCurrentPlace', false), set('currentPlace', action.place), unset('error'))(state)
        : state;
    case FETCH_PLACE_FAILURE:
      return compose(set('loadingCurrentPlace', false), set('error', action.error), set('currentPlace', {}))(state);
    default:
      return state;
  }
};
