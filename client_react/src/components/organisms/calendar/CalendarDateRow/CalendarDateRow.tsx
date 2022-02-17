import React from 'react';
import { Account, DayItem } from 'types';
import CalendarDateItem from '../CalendarDateItem';
import './CalendarDateRow.scss';

export interface CalendarDateRowProps {
  days: DayItem[];
  onClickAccount: (account: Account) => void;
}

const CalendarDateRow: React.FC<CalendarDateRowProps> = ({ days, onClickAccount }) => {
  return (
    <ul className='calendar-date-row'>
      {days.map(day => (
        <CalendarDateItem key={day.yyyymmdd} day={day} onClickAccount={onClickAccount} />
      ))}
    </ul>
  );
};

export default CalendarDateRow;
