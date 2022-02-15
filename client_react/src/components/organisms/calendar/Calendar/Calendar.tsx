import React from 'react';
import { DayItem } from 'types';
import { c } from '~/utils/classNames';
import CalendarDateRow from '../CalendarDateRow';
import './Calendar.scss';

export interface CalendarProps {
  weeks: DayItem[][];
}

const Calendar: React.FC<CalendarProps> = ({ weeks }) => {
  return (
    <div className='calendar'>
      <ul className='calendar__week'>
        {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(item => (
          <li key={item} className={c('calendar__week-item', `&--${item}`)}>
            {item}
          </li>
        ))}
      </ul>
      {weeks.map((week, i) => (
        <CalendarDateRow key={i} days={week} />
      ))}
    </div>
  );
};

export default Calendar;
