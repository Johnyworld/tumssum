import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import { useSelector } from '~utils/redux/hooks'

import IntroPage from './IntroPage';
import NotFoundPage from './NotFoundPage';
import LoginPage from '~routes/LoginPage';
import RegisterPage from '~routes/RegisterPage';
import ConfirmToken from '~routes/ConfirmTokenPage/ConfirmTokenPage';
import HomePage from '~routes/HomePage';
import FullLoader from '../components/items/FullLoader';
import BudgetPage from '~routes/BudgetPage';
import CategoryPage from '~routes/CategoryPage';
import BankPage from '~routes/BankPage';

import useFetch from '~hooks/useFetch';
import { Account, Category, CategoryGroup } from 'types';
import { useDispatch } from 'react-redux';
import { setCategories, setCategoryGroups } from '~features/category/categorySlice';
import { setAccounts } from '~features/account/accountSlice';
import { getLocalStringFromISOString } from '~utils/calendar';
import PageContainer from '~components/layouts/PageComtainet';


const App: FunctionalComponent = () => {

  const { userInfo } = useSelector(state=> state.user);
 
  return (
    <div id='preact_root'>
    
      <FullLoader />

      { !userInfo &&
        <Router>
          <Route path="/" component={IntroPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/confirm" component={ConfirmToken} />
          <NotFoundPage default />
        </Router>
      }

      { userInfo &&
        <UserLoggedIn /> 
      }

    </div>
  );
};

const UserLoggedIn: FunctionalComponent = () => {

  const dispatch = useDispatch();

	useFetch<Account[]>({
		method: 'GET',
		url: `/api/accounts/`,
		onSuccess: data => {
      dispatch(setAccounts(data.map(data => {
				data.datetime = getLocalStringFromISOString(data.datetime);
				return data;
			})));
		}
	});

	useFetch<{ categories: Category[], groups: CategoryGroup[] }>({
		method: 'GET',
		url: `/api/categories/`,
		onSuccess: data => {
      dispatch(setCategories(data.categories));
      dispatch(setCategoryGroups(data.groups));
		}
	});

  return (
    <PageContainer>
      <Router>
        <Route path="/" component={HomePage} />
        <Route path="/budget" component={BudgetPage} />
        <Route path="/category" component={CategoryPage} />
        <Route path="/bank" component={BankPage} />
        <NotFoundPage default />
      </Router>
    </PageContainer>
  )
}

export default App;
