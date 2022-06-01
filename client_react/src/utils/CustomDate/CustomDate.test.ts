import CustomDate from './CustomDate';

const customDate = new CustomDate('2022-01-31T22:30:55.100Z');

test('returns iso string', () => {
  expect(customDate.getIsoString()).toEqual('2022-01-31T22:30:55.100Z');
});

test('returns local datetime', () => {
  expect(customDate.getLocalYYYYMMDDHHmmss()).toEqual('2022-02-01T07:30:55');
});

test('returns local year and month', () => {
  expect(customDate.getLocalYYYYMM()).toEqual('2022-02');
});

test('returns local time', () => {
  expect(customDate.getLocalHHmmss()).toEqual('07:30:55');
});

test('returns local hours and minutes', () => {
  expect(customDate.getLocalHHmm()).toEqual('07:30');
});

test('returns local string', () => {
  expect(customDate.getLocalString()).toEqual('1 Feb 2022');
});

test('returns local string year and month', () => {
  expect(customDate.getLocalStringYM()).toEqual('Feb 2022');
});

test('set month', () => {
  customDate.setMonth(2);
  expect(customDate.getLocalYYYYMM()).toEqual('2022-04');
  customDate.setMonth(-3);
  expect(customDate.getLocalStringYM()).toEqual('Jan 2022');
});
