import React from 'react';
import { Bank } from 'types';
import { c } from '~/utils/classNames';
import numberUtil from '~/utils/numberUtil';
import './BankListItem.scss';

export interface BankListItemProps {
  bank: Bank;
  onClick?: () => void;
}

const BankListItem: React.FC<BankListItemProps> = ({ bank, onClick }) => {
  const { title, memo, balance } = bank;
  return (
    <li className={c('bank-list-item', [!!onClick, '&--clickable'])} onClick={onClick}>
      <p className={c('bank-list-item__title', [!title, '&--disabled'])}>{title || '이름 없음'}</p>
      <p className='bank-list-item__memo'>{memo}</p>
      <p className={c('bank-list-item__balance', [balance !== undefined && balance < 0, '&--negative'])}>
        {numberUtil.getComma(balance || 0)}
      </p>
    </li>
  );
};

export default BankListItem;
