import SearchProvider from './search';
import testdata from '../data/testdata';

const allResults = testdata
  .filter((feature) => feature.geometry)
  .map((feature) => ({
    x: feature.geometry.coordinates[1],
    y: feature.geometry.coordinates[0],
    label: feature.properties.english_place_name,
  }));

const palermoResults = testdata
  .filter((feature) => feature.properties.english_place_name === 'Palermo')
  .map((feature) => ({
    x: feature.geometry.coordinates[1],
    y: feature.geometry.coordinates[0],
    label: feature.properties.english_place_name,
  }));

const cataniaResults = testdata
  .filter((feature) => feature.properties.english_place_name === 'Catania')
  .map((feature) => ({
    x: feature.geometry.coordinates[1],
    y: feature.geometry.coordinates[0],
    label: feature.properties.english_place_name,
  }));

const agroResults = testdata
  .filter((feature) => feature.properties.english_place_name === "Forza d'Agrò")

  .map((feature) => ({
    x: feature.geometry.coordinates[1],
    y: feature.geometry.coordinates[0],
    label: feature.properties.english_place_name,
  }));

describe('SearchProvider', () => {
  let sp;

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

  test('search strips diacritics', async () => {
    expect.assertions(1);
    const data = await sp.search({ query: 'agro' });
    expect(JSON.stringify(data)).toEqual(JSON.stringify(agroResults));
  });

  test('will not return items that do not have coordinates', async () => {
    expect.assertions(1);
    const data = await sp.search({ query: 'Unknown' });
    expect(JSON.stringify(data)).toEqual(JSON.stringify([]));
  });
});
