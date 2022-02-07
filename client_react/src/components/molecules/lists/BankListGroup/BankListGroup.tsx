import React from 'react';
import { Bank, BankGroup } from 'types';
import { c } from '~/utils/classNames';
import BankListItem from '../BankListItem';
import './BankListGroup.scss';

export interface BankListGroupProps {
  bankGroup: BankGroup;
  onClickBank?: (bank: Bank) => void;
  onClickGroup?: (group: BankGroup) => void;
}

const BankListGroup: React.FC<BankListGroupProps> = ({ bankGroup, onClickBank, onClickGroup }) => {
  const { id, title, items } = bankGroup;
  const isGroupUnspecified = !id;

  return (
    <div className='bank-list-group'>
      <p
        className={c('bank-list-group__title', [!title, '&--disabled'], [!isGroupUnspecified, '&--clickable'])}
        onClick={onClickGroup && !isGroupUnspecified ? () => onClickGroup(bankGroup) : undefined}
      >
        {isGroupUnspecified ? '그룹 미지정' : title || '이름 없음'}
      </p>

      <ul className='bank-list-group__list'>
        {!items?.length ? (
          <p className='bank-list-group__placeholder'>비어있음</p>
        ) : (
          items.map(bank => (
            <BankListItem key={bank.id} bank={bank} onClick={onClickBank ? () => onClickBank(bank) : undefined} />
          ))
        )}
      </ul>
    </div>
  );
};

export default BankListGroup;
