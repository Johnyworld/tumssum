import React from 'react';
import BankList from '~/components/molecules/lists/BankList';
import GlobalHeader from '~/components/organisms/headers/GlobalHeader';
import bankUtil from '~/utils/bankUtil';
import { useSelector } from '~/utils/reduxHooks';

const BankPage: React.FC = () => {
  const bankGroup = useSelector((state) => state.bank.bankGroups);
  const banks = useSelector((state) => state.bank.banks);
  const bankTree = bankUtil.getBankTree(bankGroup, banks);
  return (
    <div>
      <GlobalHeader />
      <BankList bankTree={bankTree || []} />
    </div>
  );
};

export default BankPage;
