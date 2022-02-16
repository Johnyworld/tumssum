import React from 'react';
import GlobalHeader from '~/components/organisms/headers/GlobalHeader';
import AccountManagerContainer from '~/containers/account/AccountManagerContainer';
import DateSelectorContainer from '~/containers/DateSelectorContainer';
import FlexableSideLayout from '~/layouts/FlexableSideLayout';
import './IndexPage.scss';

const IndexPage: React.FC = () => {
  return (
    <div className='index-page'>
      <GlobalHeader />
      <DateSelectorContainer />
      <main className='index-page__main'>
        <FlexableSideLayout left={<AccountManagerContainer />} right={<p>Right</p>} />
      </main>
    </div>
  );
};

export default IndexPage;
