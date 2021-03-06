import { h, FunctionalComponent } from 'preact';
import useFetch from '~hooks/useFetch';
import { Account, Bank, BankGroup, Budget, Category, CategoryGroup, Month } from 'types';
import { setCategories, setCategoryGroups, setIsLoaded as setCategoryIsLoaded } from '~stores/categorySlice';
import { setAccounts, setIsLoaded as setAccountIsLoaded } from '~stores/accountSlice';
import { getLocalStringFromISOString } from '~utils/calendar';
import { setBankGroups, setBanks } from '~stores/bankSlice';
import { setMonths } from '~stores/monthSlice';
import { useDispatch, useSelector } from '~utils/redux/hooks';
import { setBudgets } from '~stores/budgetSlice';
import { logout } from '~stores/userSlice';
import useAlert from '~hooks/useAlert';
import Router, { Route } from 'preact-router';
import HomePage from '~pages/HomePage';
import CategoryPage from '~pages/CategoryPage';
import BankPage from '~pages/BankPage';
import SettingsPage from '~pages/SettingsPage';
import NotFoundPage from '~pages/NotFoundPage';
import GlobalHeaderContainer from '~features/globalHeader';
import './Pages.scss';

const AppLoggedInRouter: FunctionalComponent = () => {

	const currentDate = useSelector(state => state.date.currentDate);
  const dispatch = useDispatch();
	const alert = useAlert();

	useFetch<Account[]>({
		method: 'GET',
		url: `/api/accounts/`,
		onSuccess: data => {
			dispatch(setAccountIsLoaded);
      dispatch(setAccounts(data.map(data => {
				data.datetime = getLocalStringFromISOString(data.datetime);
				return data;
			})));
		},
		onError: () => {
			alert('로그인 기간이 만료되었네요!\n다시 로그인해주세요 :)', () => {
				dispatch(logout());
			});
		}
	});

	useFetch<{ categories: Category[], groups: CategoryGroup[] }>({
		method: 'GET',
		url: `/api/categories/`,
		onSuccess: data => {
      dispatch(setCategoryGroups(data.groups));
      dispatch(setCategories(data.categories));
			dispatch(setCategoryIsLoaded);
		}
	});

  useFetch<{ banks: Bank[], groups: BankGroup[] }>({
		method: 'GET',
		url: `/api/banks/`,
		onSuccess: data => {
      dispatch(setBankGroups(data.groups));
      dispatch(setBanks(data.banks));
		}
  });

	useFetch<Month[]>({
		method: 'GET',
		url: `/api/months/`,
		params: {
			date: currentDate.substr(0, 7),
		},
		onSuccess: data => {
      dispatch(setMonths(data));
		}
  });

	useFetch<Budget[]>({
		method: 'GET',
		url: `/api/budgets/`,
		onSuccess: data => {
      dispatch(setBudgets(data));
		}
  });

  return (
	<div class='page-container'>
		<GlobalHeaderContainer />
		<Router>
			<Route path="/" component={HomePage} />
			<Route path="/category" component={CategoryPage} />
			<Route path="/bank" component={BankPage} />
			<Route path="/settings" component={SettingsPage} />
			<NotFoundPage default />
		</Router>
	</div>
	)
}

export default AppLoggedInRouter;
