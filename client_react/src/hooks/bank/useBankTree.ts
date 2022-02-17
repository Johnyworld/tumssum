import bankUtil from '~/utils/bankUtil';
import { useSelector } from '~/utils/reduxHooks';

const useBankTree = () => {
  const bankGroup = useSelector(state => state.bank.bankGroups);
  const banks = useSelector(state => state.bank.banks);
  const months = useSelector(state => state.month.months);
  const bankTree = bankUtil.getBankTree(bankGroup, banks, months);

  return bankTree || [];
};

export default useBankTree;
