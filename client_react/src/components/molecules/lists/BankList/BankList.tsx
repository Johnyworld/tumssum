import React from 'react';
import { Bank, BankTree } from 'types';
import BankListGroup from '../BankListGroup';
import './BankList.scss';

export interface BankListProps {
  bankTree: BankTree;
  onClick?: (bank: Bank) => void;
}

const BankList: React.FC<BankListProps> = ({ bankTree, onClick }) => {
  return (
    <div className='bank-list'>
      {!bankTree?.length ? (
        <p className='bank-list__placeholder'>뱅크가 없어요.</p>
      ) : (
        bankTree.map((group) => <BankListGroup key={group.id} bankGroup={group} onClick={onClick} />)
      )}
    </div>
  );
};

export default BankList;
