import React from 'react';
import { Account, DayItem } from 'types';
import CalendarDateItem from '../CalendarDateItem';
import './CalendarDateRow.scss';

export interface CalendarDateRowProps {
  days: DayItem[];
  onClickAccount: (account: Account) => void;
  onGrab: (account: Account) => React.MouseEventHandler<HTMLLIElement>;
  onDrop: (yyyymmdd: string) => React.MouseEventHandler<HTMLLIElement>;
}

const CalendarDateRow: React.FC<CalendarDateRowProps> = ({ days, onClickAccount, onGrab, onDrop }) => {
  return (
    <ul className='calendar-date-row'>
      {days.map(day => (
        <CalendarDateItem
          key={day.yyyymmdd}
          day={day}
          onClickAccount={onClickAccount}
          onGrab={onGrab}
          onDrop={onDrop}
        />
      ))}
    </ul>
  );
};

export default CalendarDateRow;
