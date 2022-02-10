import React from 'react';
import { DayItem } from 'types';
import CalendarDateItem from '../CalendarDateItem';
import './CalendarDateRow.scss';

export interface CalendarDateRowProps {
  days: DayItem[];
}

const CalendarDateRow: React.FC<CalendarDateRowProps> = ({ days }) => {
  return (
    <ul className='calendar-date-row'>
      {days.map(day => (
        <CalendarDateItem key={day.yyyymmdd} day={day} />
      ))}
    </ul>
  );
};

export default CalendarDateRow;
