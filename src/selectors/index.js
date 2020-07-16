import { createSelector } from 'reselect';

const getLoading = state => state.loading;

export const getLoadingState = createSelector([getLoading], loading => loading);

const getSites = state => state.sites;

export const getSitesState = createSelector([getSites], sites => sites);
