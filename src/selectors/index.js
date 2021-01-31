/* eslint-disable no-shadow */
import { createSelector } from 'reselect';

const loading = (state) => state.map.loading;

export const loadingSelector = createSelector([loading], (loading) => loading);

const sites = (state) => state.map.sites;

export const sitesSelector = createSelector([sites], (sites) => sites);

const currentPlace = (state) => state.map.currentPlace;

export const currentPlaceSelector = createSelector([currentPlace], (currentPlace) => currentPlace);

const loadingCurrentPlace = (state) => state.map.loadingCurrentPlace;

export const loadingCurrentPlaceSelector = createSelector(
  [loadingCurrentPlace],
  (loadingCurrentPlace) => loadingCurrentPlace,
);

export const legendSelector = createSelector([loadingSelector, sitesSelector], (loading, sites) => ({
  loading,
  sites,
}));

export const markersSelector = createSelector([sitesSelector, currentPlaceSelector], (sites, place) => ({
  sites,
  place,
}));

const currentLocale = (state) => state.Intl.locale;

export const currentLocaleSelector = createSelector([currentLocale], (currentLocale) => currentLocale);

export const popupSelector = createSelector(
  [currentPlaceSelector, loadingCurrentPlaceSelector, currentLocaleSelector],
  (currentPlace, loadingCurrentPlace, currentLocale) => ({ currentPlace, loadingCurrentPlace, currentLocale }),
);
