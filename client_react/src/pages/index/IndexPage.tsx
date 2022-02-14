import React from 'react';
import GlobalHeader from '~/components/organisms/headers/GlobalHeader';
import DashboardContainer from '~/containers/DashboardContainer';

const IndexPage: React.FC = () => {
  return (
    <div className='index-page'>
      <GlobalHeader />
      <main className='index-page__main'>
        <DashboardContainer />
      </main>
    </div>
  );
};

export default IndexPage;
