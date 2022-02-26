import React from 'react';
import { Account, BankTree, CategoryTree } from 'types';
import './AccountList.scss';
import AccountListItem from './AccountListItem';

export interface AccountListProps {
  accounts: Account[];
  categoryTree: CategoryTree;
  bankTree: BankTree;
  onChange: (account: Account) => void;
}

const AccountList: React.FC<AccountListProps> = ({ accounts, categoryTree, bankTree, onChange }) => {
  return (
    <div className='account-list'>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>날짜</th>
            <th>시간</th>
            <th className='t-left'>제목</th>
            <th className='t-right'>금액</th>
            <th>카테고리</th>
            <th>뱅크</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, i) => (
            <AccountListItem
              key={account.id}
              index={i}
              account={account}
              categoryTree={categoryTree}
              bankTree={bankTree}
              onChange={onChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountList;
