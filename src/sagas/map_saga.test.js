import { enableFetchMocks } from 'jest-fetch-mock';
import { runSaga } from 'redux-saga';
import { getAllPlacesSaga } from './map_saga';
import { loadSitesBegin, loadSitesSuccess, loadSitesFailure } from '../actions';

enableFetchMocks();

describe('getAllPlaces', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should call fetch and dispatch success action', async () => {
    const resultSites = { features: [{ name: 'Site1' }, { name: 'Site2' }] };
    const expectedSites = {
      features: [
        { id: 'site_1', name: 'Site1' },
        { id: 'site_2', name: 'Site2' },
      ],
    };
    fetch.mockResponseOnce(JSON.stringify(resultSites));
    const dispatched = [];

    const task = runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ loading: false, sites: [] }),
      },
      getAllPlacesSaga,
    );

    await task.toPromise();

    expect(fetch.mock.calls.length).toEqual(1);
    expect(dispatched).toEqual([loadSitesBegin(), loadSitesSuccess(expectedSites)]);
  });

  it('should call fetch and dispatch failure action', async () => {
    const expectedResult = new Error('error occurred');
    fetch.mockReject(expectedResult);
    const dispatched = [];

    const task = runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ loading: false, sites: [] }),
      },
      getAllPlacesSaga,
    );

    await task.toPromise();

    expect(fetch.mock.calls.length).toEqual(1);
    expect(dispatched).toEqual([loadSitesBegin(), loadSitesFailure(expectedResult)]);
  });
});
