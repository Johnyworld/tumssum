import React from 'react';
import { Account, DefaultProps } from 'types';
import { c } from '~/utils/classNames';
import numberUtil from '~/utils/numberUtil';
import './CalendarAccountItem.scss';

export interface CalendarAccountItemProps extends DefaultProps {
  account: Account;
  onClick?: () => void;
  onMouseDown?: React.MouseEventHandler<HTMLLIElement>;
}

const CalendarAccountItem: React.FC<CalendarAccountItemProps> = ({
  style,
  className,
  account,
  onClick,
  onMouseDown,
}) => {
  const { title, memo, account: amount } = account;

  return (
    <li
      className={c('calendar-account-item', '&--hover', className)}
      onClick={onClick}
      onMouseDown={onMouseDown}
      style={style}
    >
      <p className={c('calendar-account-item__title', [!title, '&--disabled'])}>{title || '제목 없음'}</p>
      <p className='calendar-account-item__memo'>{memo}</p>
      <p className={c('calendar-account-item__balance', !amount ? '' : amount < 0 ? '&--negative' : '&--positive')}>
        {numberUtil.getComma(amount || 0)}
      </p>
    </li>
  );
};

export default CalendarAccountItem;
