import React from 'react';
import { DayItem } from 'types';
import CalendarAccountItem from '../CalendarAccountItem';
import './CalendarDateItem.scss';

export interface CalendarDateItemProps {
  day: DayItem;
}

const CalendarDateItem: React.FC<CalendarDateItemProps> = ({ day }) => {
  const { yyyymmdd, accounts } = day;
  const date = yyyymmdd.substring(8, 10);
  return (
    <li className='calendar-date-item'>
      <div className='calendar-date-item__topbar'>{date && <p>{+date}</p>}</div>
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
