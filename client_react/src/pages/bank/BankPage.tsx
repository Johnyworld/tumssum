import React from 'react';
import GlobalHeader from '~/components/organisms/headers/GlobalHeader';
import BankListContainer from '~/containers/bank/BankListContainer/BankListContainer';
import './BankPage.scss';

const BankPage: React.FC = () => {
  return (
    <div className='bank-page'>
      <GlobalHeader />
      <main className='bank-page__main'>
        <BankListContainer />
      </main>
    </div>
  );
};

export default BankPage;
