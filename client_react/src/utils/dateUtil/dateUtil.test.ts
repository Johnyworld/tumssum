import { getMonthCount } from './dateUtil';

test('tests getMonthCount function', () => {
  expect(getMonthCount('2022-02', '2021-07')).toEqual(8);
  expect(getMonthCount('2021-07', '2022-02')).toEqual(8);
  expect(getMonthCount('2022-05', '2022-05')).toEqual(1);
  expect(getMonthCount('2022-05', '2020-01')).toEqual(29); // 12 + 12 + 5
  expect(getMonthCount('2022-02', '2021-07', '2023-05')).toEqual(8); // 3번째 인자부터 무시됨
  expect(getMonthCount('2022-02')).toEqual(0); // 인자가 2개 이하면 0을 리턴
  expect(getMonthCount()).toEqual(0); // 인자가 2개 이하면 0을 리턴
  expect(getMonthCount('2022', '2021')).toEqual(NaN); // 형식이 맞지 않으면 NaN이 리턴 됨.
});
