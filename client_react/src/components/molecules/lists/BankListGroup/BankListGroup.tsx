import React from 'react';
import { Bank, BankGroup } from 'types';
import { c } from '~/utils/classNames';
import BankListItem from '../BankListItem';
import './BankListGroup.scss';

export interface BankListGroupProps {
  bankGroup: BankGroup;
  onClick?: (bank: Bank) => void;
}

const BankListGroup: React.FC<BankListGroupProps> = ({ bankGroup, onClick }) => {
  const { title, items } = bankGroup;

  return (
    <div className='bank-list-group'>
      <p className={c('bank-list-group__title', [!title, '&--disabled'])}>{title || '이름 없음'}</p>
      <ul className='bank-list-group__list'>
        {!items?.length ? (
          <p className='bank-list-group__placeholder'>비어있음</p>
        ) : (
          items.map((bank) => (
            <BankListItem key={bank.id} bank={bank} onClick={onClick ? () => onClick(bank) : undefined} />
          ))
        )}
      </ul>
    </div>
  );
};

export default BankListGroup;
