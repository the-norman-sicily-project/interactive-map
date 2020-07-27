import {
  ddToDms,
  getDms,
  startCaseTerm,
  startCaseList,
  getListOfOrders,
  orderColorLookup,
} from './utils';

describe('orderColorLookup', () => {
  it('return a color for an unknown order', () => {
    expect(orderColorLookup('FOO')).toEqual('#fff');
  });
});

describe('getListOfOrders', () => {
  it('should return a list of order property values', () => {
    const list = [
      { properties: { order: 'foo' } },
      { properties: { order: 'bar' } },
    ];
    expect(getListOfOrders(list)).toEqual(['bar', 'foo', 'Unknown']);
  });
  it('should ignore items with no order property values', () => {
    const list = [
      { properties: { baz: 'quux' } },
      { properties: { order: 'foo' } },
      { properties: { order: 'bar' } },
    ];
    expect(getListOfOrders(list)).toEqual(['bar', 'foo', 'Unknown']);
  });
  it('should sort the list orf orders', () => {
    const list = [
      { properties: { order: 'quux' } },
      { properties: { order: 'foo' } },
      { properties: { order: 'bar' } },
    ];
    expect(getListOfOrders(list)).toEqual(['bar', 'foo', 'quux', 'Unknown']);
  });
});

describe('getDms', () => {
  it('should convert the decimal value to degrees minutees seconds format', () => {
    expect(getDms(36.828956)).toEqual(['36º', "49'", '44.242"']);
    expect(getDms(14.524197)).toEqual(['14º', "31'", '27.109"']);
  });
});

describe('ddToDms', () => {
  it('should return the expected coordinates in degrees, minutes, seconds format', () => {
    expect(ddToDms({ lng: 36.828956, lat: 14.524197 })).toEqual(
      'E 36º 49\' 44.242" N 14º 31\' 27.109"'
    );
  });
});

describe('startCaseTerm', () => {
  it('should upper case the first letter of a term', () => {
    expect(startCaseTerm('fOO')).toEqual('FOO');
    expect(startCaseTerm('foo')).toEqual('Foo');
    expect(startCaseTerm('FoO')).toEqual('FoO');
    expect(startCaseTerm('1oo')).toEqual('1oo');
  });
});

describe('startCaseList', () => {
  it('should upper case the first letter of each term in a comma delimited string', () => {
    expect(startCaseList('foo,BAR,Baz,qUuX')).toEqual('Foo, BAR, Baz, QUuX');
    expect(startCaseList('foo|BAR|Baz|qUuX', '|')).toEqual(
      'Foo, BAR, Baz, QUuX'
    );
  });
});
