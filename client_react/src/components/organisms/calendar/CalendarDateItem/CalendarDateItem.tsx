import React from 'react';
import { DayItem } from 'types';
import { c } from '~/utils/classNames';
import CalendarAccountItem from '../CalendarAccountItem';
import './CalendarDateItem.scss';

export interface CalendarDateItemProps {
  day: DayItem;
}

const CalendarDateItem: React.FC<CalendarDateItemProps> = ({ day }) => {
  const { yyyymmdd, accounts, isThisMonth, isToday } = day;
  const date = yyyymmdd.split('-')[2];
  return (
    <li className='calendar-date-item'>
      <div className={c('calendar-date-item__topbar', [!isThisMonth, '&--disabled'])}>
        {date && <p className={c('calendar-date-item__date', [isToday, '&--today'])}>{+date}</p>}
      </div>
      {accounts && (
        <ul className='calendar-date-item__body'>
          {accounts.map(account => (
            <CalendarAccountItem key={account.id} account={account} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CalendarDateItem;
