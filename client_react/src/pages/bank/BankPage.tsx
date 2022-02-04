import React from 'react';
import GlobalHeader from '~/components/organisms/headers/GlobalHeader';
import BankListContainer from '~/containers/bank/BankListContainer/BankListContainer';
import bankUtil from '~/utils/bankUtil';
import { useSelector } from '~/utils/reduxHooks';
import './BankPage.scss';

const BankPage: React.FC = () => {
  const bankGroup = useSelector((state) => state.bank.bankGroups);
  const banks = useSelector((state) => state.bank.banks);
  const bankTree = bankUtil.getBankTree(bankGroup, banks);
  return (
    <div className='bank-page'>
      <GlobalHeader />
      <main className='bank-page__main'>
        <BankListContainer bankTree={bankTree || []} />
      </main>
    </div>
  );
};

export default BankPage;
