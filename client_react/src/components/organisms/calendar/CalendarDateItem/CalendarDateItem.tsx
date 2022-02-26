import React from 'react';
import { Account, DayItem } from 'types';
import { c } from '~/utils/classNames';
import CalendarAccountItem from '../CalendarAccountItem';
import './CalendarDateItem.scss';

export interface CalendarDateItemProps {
  day: DayItem;
  onClickAccount: (account: Account) => void;
  onGrab: (account: Account) => React.MouseEventHandler<HTMLLIElement>;
  onDrop: (yyyymmdd: string) => React.MouseEventHandler<HTMLLIElement>;
}

const CalendarDateItem: React.FC<CalendarDateItemProps> = ({ day, onClickAccount, onGrab, onDrop }) => {
  const { yyyymmdd, accounts, isThisMonth, isToday } = day;
  const date = yyyymmdd.split('-')[2];

  return (
    <li className='calendar-date-item' onMouseUp={onDrop(yyyymmdd)}>
      <div className={c('calendar-date-item__topbar', [!isThisMonth, '&--disabled'])}>
        {date && <p className={c('calendar-date-item__date', [isToday, '&--today'])}>{+date}</p>}
      </div>
      {accounts && (
        <ul className='calendar-date-item__body'>
          {accounts.map(account => (
            <CalendarAccountItem
              key={account.id}
              account={account}
              onClick={() => onClickAccount(account)}
              onMouseDown={onGrab(account)}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CalendarDateItem;
