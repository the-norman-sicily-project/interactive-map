import SearchProvider from './searchprovider';
import testdata from '../data/testdata';

let sp;

const allResults = testdata.features
  .filter(feature => feature.geometry)
  .map(feature => ({
    x: feature.geometry.coordinates[0],
    y: feature.geometry.coordinates[1],
    label: feature.properties.english_place_name,
  }));

const palermoResults = testdata.features
  .filter(feature => feature.properties.english_place_name === 'Palermo')
  .map(feature => ({
    x: feature.geometry.coordinates[0],
    y: feature.geometry.coordinates[1],
    label: feature.properties.english_place_name,
  }));

const cataniaResults = testdata.features
  .filter(feature => feature.properties.english_place_name === 'Catania')
  .map(feature => ({
    x: feature.geometry.coordinates[0],
    y: feature.geometry.coordinates[1],
    label: feature.properties.english_place_name,
  }));

beforeAll(() => {
  sp = new SearchProvider(testdata);
});

test('empty query returns all data', async () => {
  expect.assertions(1);
  const data = await sp.search({ query: '' });
  expect(JSON.stringify(data)).toEqual(JSON.stringify(allResults));
});

test('valid query returns expected results', async () => {
  expect.assertions(1);
  const data = await sp.search({ query: 'Catania' });
  expect(JSON.stringify(data)).toEqual(JSON.stringify(cataniaResults));
});

test('search is case insensitive', async () => {
  expect.assertions(1);
  const data = await sp.search({ query: 'pAlErMo' });
  expect(JSON.stringify(data)).toEqual(JSON.stringify(palermoResults));
});

test('will not return items that do not have coordinates', async () => {
  expect.assertions(1);
  const data = await sp.search({ query: 'Unknown' });
  expect(JSON.stringify(data)).toEqual(JSON.stringify([]));
});
