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
  const testingDate = new CustomDate('2022-01-31T22:30:55.100Z');
  testingDate.setMonth(2);
  expect(testingDate.getLocalYYYYMM()).toEqual('2022-04');
  testingDate.setMonth(-3);
  expect(testingDate.getLocalStringYM()).toEqual('Jan 2022');
});

test('set date', () => {
  const testingDate = new CustomDate('2022-01-31T22:30:55.100Z');
  testingDate.setYYYYMMDD('2019-11-20');
  expect(testingDate.getLocalYYYYMMDD()).toEqual('2019-11-20');
  testingDate.setYYYYMMDD('2019-11-20T12:22:10'); // 시간이 같이 들어가도 무시 돼야 함
  expect(testingDate.getLocalYYYYMMDD()).toEqual('2019-11-20');
})

test('set time', () => {
  const testingDate = new CustomDate('2022-01-31T22:30:55.100Z');
  testingDate.setHHmmss('03:12:33');
  expect(testingDate.getLocalHHmmss()).toEqual('03:12:33');
  testingDate.setHHmmss('');
  expect(testingDate.hasTime).toEqual(false);
  expect(testingDate.getLocalHHmmss()).toEqual('');
})

