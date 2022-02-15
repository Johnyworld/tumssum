import { Account } from 'types';
import CalendarBase from '.';

test('get calendar base', () => {
  const mockAccountA = { datetime: '2022-02-02', id: 1, account: 3000, title: '빵' } as Account;
  const mockAccountB = { datetime: '2022-03-01', id: 2, account: 4000, title: '커피' } as Account;
  const base = new CalendarBase('2022-02', [mockAccountA, mockAccountB]);
  expect(base.getCalendar()[0][1]).toEqual({ yyyymmdd: '2022-01-31' });
  expect(base.getCalendar()[0][3]).toEqual({
    yyyymmdd: '2022-02-02',
    isThisMonth: true,
    isToday: false,
    accounts: [mockAccountA],
  });
  expect(base.getCalendar()[4][2]).toEqual({ yyyymmdd: '2022-03-01', accounts: [mockAccountB] });
});
