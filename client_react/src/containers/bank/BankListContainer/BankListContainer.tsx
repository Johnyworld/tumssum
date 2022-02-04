import React from 'react';
import { BankTree } from 'types';
import Button from '~/components/atoms/Button';
import BankList from '~/components/molecules/lists/BankList';
import useToggle from '~/hooks/useToggle';
import BankFormModalContainer from '../BankFormModalContainer';
import BankGroupFormModalContainer from '../BankGroupFormModalContainer';
import './BankListContainer.scss';

export interface BankListContainerProps {
  bankTree: BankTree;
}

const BankListContainer: React.FC<BankListContainerProps> = ({ bankTree }) => {
  const [isOpenCreateGroup, onOpenCreateGroup, onCloseCreateGroup] = useToggle();
  const [isOpenCreateBank, onOpenCreateBank, onCloseCreateBank] = useToggle();

  return (
    <div className='bank-list-container'>
      <div className='bank-list-container__buttons'>
        <Button size='small' color='paper' onClick={onOpenCreateGroup} children='그룹 추가하기' />
        <Button size='small' onClick={onOpenCreateBank} children='뱅크 추가하기' />
      </div>

      <BankList bankTree={bankTree} />

      <BankGroupFormModalContainer isOpen={isOpenCreateGroup} onClose={onCloseCreateGroup} />
      <BankFormModalContainer isOpen={isOpenCreateBank} onClose={onCloseCreateBank} />
    </div>
  );
};

export default BankListContainer;
