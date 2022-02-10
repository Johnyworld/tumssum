import React from 'react';
import { Account } from 'types';
import { c } from '~/utils/classNames';
import numberUtil from '~/utils/numberUtil';
import './CalendarAccountItem.scss';

export interface CalendarAccountItemProps {
  account: Account;
}

const CalendarAccountItem: React.FC<CalendarAccountItemProps> = ({ account }) => {
  const { title, memo, account: amount } = account;
  return (
    <li className='calendar-account-item'>
      <p className={c('calendar-account-item__title', [!title, '&--disabled'])}>{title || '제목 없음'}</p>
      <p className='calendar-account-item__memo'>{memo}</p>
      <p className={c('calendar-account-item__balance', amount < 0 ? '&--negative' : amount > 0 ? '&--positive' : '')}>
        {numberUtil.getComma(amount || 0)}
      </p>
    </li>
  );
};

export default CalendarAccountItem;
