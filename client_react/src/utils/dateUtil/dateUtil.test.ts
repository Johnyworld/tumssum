import { getMonthCount, getIsLeap } from './dateUtil';

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

test('tests getIsLeap function', () => {
  // 4로 나누어 떨어지는 해는 윤년, 그 밖의 해는 평년으로 한다.
  expect(getIsLeap(4)).toBeTruthy();
  expect(getIsLeap(5)).toBeFalsy();
  expect(getIsLeap(2000)).toBeTruthy();
  expect(getIsLeap(1600)).toBeTruthy();
  // 100으로 나누어 떨어지지만 400으로 나누어 떨어지지 않는 해는 평년으로 한다.(예: 1900년, 2100년)
  expect(getIsLeap(1900)).toBeFalsy();
  expect(getIsLeap(2100)).toBeFalsy();
  expect(getIsLeap(2200)).toBeFalsy();
  expect(getIsLeap(2300)).toBeFalsy();
});
