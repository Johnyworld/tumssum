import React from 'react';
import { Account } from 'types';
import CalendarAccountItem from '../CalendarAccountItem';
import './CalendarDateItem.scss';

export interface CalendarDateItemProps {
  date: string;
  accounts: Account[];
}

const CalendarDateItem: React.FC<CalendarDateItemProps> = ({ date, accounts }) => {
  return (
    <div className='calendar-date-item'>
      <div className='calendar-date-item__topbar'>{date && <p>{date}</p>}</div>
      <ul className='calendar-date-item__body'>
        {accounts.map(account => (
          <CalendarAccountItem key={account.id} account={account} />
        ))}
      </ul>
    </div>
  );
};

export default CalendarDateItem;
