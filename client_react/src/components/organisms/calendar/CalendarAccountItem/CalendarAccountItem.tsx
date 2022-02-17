import React from 'react';
import { Account } from 'types';
import { c } from '~/utils/classNames';
import numberUtil from '~/utils/numberUtil';
import './CalendarAccountItem.scss';

export interface CalendarAccountItemProps {
  account: Account;
  onClick: () => void;
}

const CalendarAccountItem: React.FC<CalendarAccountItemProps> = ({ account, onClick }) => {
  const { title, memo, account: amount } = account;
  return (
    <li className={c('calendar-account-item', '&--hover')} onClick={onClick}>
      <p className={c('calendar-account-item__title', [!title, '&--disabled'])}>{title || '제목 없음'}</p>
      <p className='calendar-account-item__memo'>{memo}</p>
      <p className={c('calendar-account-item__balance', !amount ? '' : amount < 0 ? '&--negative' : '&--positive')}>
        {numberUtil.getComma(amount || 0)}
      </p>
    </li>
  );
};

export default CalendarAccountItem;
