import React, { useCallback, useState } from 'react';
import { Account, DayItem, GrabbingData } from 'types';
import { c } from '~/utils/classNames';
import CalendarDateRow from '../CalendarDateRow';
import CalendarDragging from './CalendarDragging';
import './Calendar.scss';
import useCalendarDrag from '~/hooks/account/useCalendarDrag';

export interface CalendarProps {
  weeks: DayItem[][];
  onClickAccount: (account: Account) => void;
  onDrop: (id: number, datetime: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ weeks, onClickAccount, onDrop }) => {
  const { grabbingData, isGrabbing, handleGrap, handleLeave, handleDrop } = useCalendarDrag({ onDrop });

  return (
    <CalendarDragging grabbingData={grabbingData} onLeave={handleLeave}>
      <div className={c('calendar', [isGrabbing, '&--grabbing'])}>
        <ul className='calendar__week'>
          {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(item => (
            <li key={item} className={c('calendar__week-item', `&--${item}`)}>
              {item}
            </li>
          ))}
        </ul>
        {weeks.map((week, i) => (
          <CalendarDateRow
            key={i}
            days={week}
            onClickAccount={onClickAccount}
            onGrab={handleGrap}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </CalendarDragging>
  );
};

export default Calendar;
