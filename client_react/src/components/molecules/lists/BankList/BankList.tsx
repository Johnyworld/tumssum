import React from 'react';
import { Bank, BankGroup, BankTree } from 'types';
import BankListGroup from '../BankListGroup';
import './BankList.scss';

export interface BankListProps {
  bankTree: BankTree;
  onClickBank?: (bank: Bank) => void;
  onClickGroup?: (group: BankGroup) => void;
}

const BankList: React.FC<BankListProps> = ({ bankTree, onClickBank, onClickGroup }) => {
  return (
    <div className='bank-list'>
      {!bankTree?.length ? (
        <p className='bank-list__placeholder'>뱅크가 없어요.</p>
      ) : (
        bankTree.map(group => (
          <BankListGroup key={group.id} bankGroup={group} onClickBank={onClickBank} onClickGroup={onClickGroup} />
        ))
      )}
    </div>
  );
};

export default BankList;
