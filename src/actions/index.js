import _ from 'lodash';
import set from 'lodash/fp/set';

export const INIT_MAP = 'INIT_MAP';
export const LOAD_SITES_BEGIN = 'LOAD_SITES_BEGIN';
export const LOAD_SITES_SUCCESS = 'LOAD_SITES_SUCCESS';
export const LOAD_SITES_FAILURE = 'LOAD_SITES_FAILURE';

export const initMap = () => {
  return {
    type: INIT_MAP,
  };
};

export const loadSitesBegin = () => {
  return {
    type: LOAD_SITES_BEGIN,
  };
};

export const loadSitesSuccess = result => {
  const sites = _.get(result, 'features', []).map((feature, index) =>
    set('id', `site_${index + 1}`, feature)
  );

  return {
    type: LOAD_SITES_SUCCESS,
    sites,
  };
};

export const loadSitesFailure = error => {
  return {
    type: LOAD_SITES_FAILURE,
    error,
  };
};
