import React from 'react';
import GlobalHeader from '~/components/organisms/headers/GlobalHeader';
import AccountManagerContainer from '~/containers/account/AccountManagerContainer';
import DateSelectorContainer from '~/containers/DateSelectorContainer';
import useBankTree from '~/hooks/bank/useBankTree';
import useCategoryTree from '~/hooks/category/useCategoryTree';
import FlexableSideLayout from '~/layouts/FlexableSideLayout';
import './IndexPage.scss';

const IndexPage: React.FC = () => {
  const categoryTree = useCategoryTree();
  const bankTree = useBankTree();

  return (
    <div className='index-page'>
      <GlobalHeader />
      <DateSelectorContainer />
      <main className='index-page__main'>
        <FlexableSideLayout
          left={<AccountManagerContainer categoryTree={categoryTree} bankTree={bankTree} />}
          right={<p>Right</p>}
        />
      </main>
    </div>
  );
};

export default IndexPage;
