import React from 'react';
import { Account, DayItem } from 'types';
import { c } from '~/utils/classNames';
import CalendarDateRow from '../CalendarDateRow';
import CalendarDragging from './CalendarDragging';
import useCalendarDrag from '~/hooks/account/useCalendarDrag';
import './Calendar.scss';
import CalendarAccountItem from '../CalendarAccountItem';

export interface CalendarProps {
  weeks: DayItem[][];
  onClickAccount: (account: Account) => void;
  onDrop: (account: Account) => void;
}

const Calendar: React.FC<CalendarProps> = ({ weeks, onClickAccount, onDrop }) => {
  const { grabbingData, isGrabbing, handleGrap, handleLeave, handleDrop } = useCalendarDrag({ onDrop });

  return (
    <CalendarDragging
      itemPos={grabbingData?.itemPos}
      clickPos={grabbingData?.clickPos}
      onLeave={handleLeave}
      render={(pos) => grabbingData && pos && (
        <CalendarAccountItem
          account={grabbingData.data}
          className='calendar__grabbed-item'
          style={{
            top: pos.y + 'px',
            left: pos.x + 'px',
            width: grabbingData.width + 'px',
            height: grabbingData.height + 'px',
          }}
        />
      )}
      children={
        <div className={c('calendar', [!!isGrabbing, '&--grabbing'])}>
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
      }
    />
  );
};

export default Calendar;
