import { cloneDeep, getOr, set, unset, compose, isEqual } from 'lodash/fp';
import _ from 'lodash';
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

const makeProperties = (props) => {
  const { labels, ...rest } = props;

  let processedLabels = {};
  if (_.isArray(labels)) {
    /* eslint-disable no-param-reassign */
    processedLabels = labels.reduce((a, c) => {
      const [lang, label] = c.split(',');
      a[lang] = label;
      return a;
    }, {});
    /* eslint-enable no-param-reassign */
  } else {
    processedLabels = { en: labels };
  }
  return { labels: processedLabels, ...rest };
};

const stardog2geojson = (places) => {
  const features = places.reduce((a, c) => {
    const { wgs_long, wgs_lat, wgs_alt, ...rest } = c;
    const place = {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [wgs_long, wgs_lat, wgs_alt] },
      properties: { ...makeProperties(rest), position: [wgs_lat, wgs_long] },
    };
    a.push(place);
    return a;
  }, []);

  return features;
};

export const mapReducer = (state = initialState, action) => {
  const currentPlace = getOr({}, 'currentPlace', state);

  switch (action.type) {
    case INIT_MAP:
      return cloneDeep(state);
    case LOAD_SITES_BEGIN:
      return set('loading', true, state);
    case LOAD_SITES_SUCCESS:
      return compose(set('loading', false), set('sites', stardog2geojson(action.places)), unset('error'))(state);
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
