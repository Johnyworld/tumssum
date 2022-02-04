import React from 'react';
import { BankTree } from 'types';
import Button from '~/components/atoms/Button';
import BankList from '~/components/molecules/lists/BankList';
import useToggle from '~/hooks/useToggle';
import BankGroupFormModalContainer from '../BankGroupFormModalContainer';
import './BankListContainer.scss';

export interface BankListContainerProps {
  bankTree: BankTree;
}

const BankListContainer: React.FC<BankListContainerProps> = ({ bankTree }) => {
  const [isOpenModal, onOpenModal, onCloseModal] = useToggle();

  return (
    <div className='bank-list-container'>
      <div className='bank-list-container__buttons'>
        <Button size='small' color='paper' onClick={onOpenModal} children='그룹 추가하기' />
        <Button size='small' children='뱅크 추가하기' />
      </div>

      <BankList bankTree={bankTree} />

      <BankGroupFormModalContainer isOpen={isOpenModal} onClose={onCloseModal} />
    </div>
  );
};

export default BankListContainer;
