import CustomDate from './CustomDate';

const customDate = new CustomDate('2022-01-31T22:30:55.100Z');

test('returns iso string', () => {
  expect(customDate.getIsoString()).toEqual('2022-01-31T22:30:55.100Z');
});

test('returns local datetime', () => {
  expect(customDate.getLocalDatetime()).toEqual('2022-02-01T07:30:55');
});

test('returns local year and month', () => {
  expect(customDate.getLocalYearMonth()).toEqual('2022-02');
});

test('returns local string', () => {
  expect(customDate.getLocalString()).toEqual('01 Feb 2022');
});
