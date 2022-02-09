import React from 'react';
import GlobalHeader from '~/components/organisms/headers/GlobalHeader';
import CategoryListContainer from '~/containers/category/CategoryListContainer';
import './CategoryPage.scss';

const CategoryPage: React.FC = () => {
  return (
    <div className='category-page'>
      <GlobalHeader />
      <main className='category-page__main'>
        <CategoryListContainer />
      </main>
    </div>
  );
};

export default CategoryPage;
