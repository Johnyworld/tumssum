import { h, FunctionalComponent } from 'preact';
import { Route, Router } from 'preact-router';
import HomePage from '~routes/HomePage';
import BudgetPage from '~routes/BudgetPage';
import CategoryPage from '~routes/CategoryPage';
import BankPage from '~routes/BankPage';
import SettingsPage from '~routes/SettingsPage';

import useFetch from '~hooks/useFetch';
import { Account, Bank, BankGroup, Category, CategoryGroup, Month } from 'types';
import { setCategories, setCategoryGroups } from '~features/category/categorySlice';
import { setAccounts } from '~features/account/accountSlice';
import { getLocalStringFromISOString } from '~utils/calendar';
import { setBankGroups, setBanks } from '~features/bank/bankSlice';
import { useMemo, useState } from 'preact/hooks';
import { AsideMenuItem } from '~components/molecules/AsideMenu/AsideMenu';
import { useLocation } from 'wouter';
import Aside from '~components/organisms/Aside';
import NotFoundPage from '../NotFoundPage';
import { getClassNames } from '~utils/classNames';
import { setMonths } from '~stores/monthSlice';
import { useDispatch, useSelector } from '~utils/redux/hooks';

const UserLoggedInPage: FunctionalComponent = () => {

	const currentDate = useSelector(state => state.date.currentDate);
  const dispatch = useDispatch();
	const [location] = useLocation();
	const path = location.split('/')[1] || 'home';
	const [isOpenAside, setIsOpenAside] = useState(localStorage.getItem('asideopen') === 'close' ? false : true);

  const gnbMenuList = useMemo(() => { return [
		{ id: 'home', text: 'Home', icon: 'home', href: '/' },
		{ id: 'budget', text: 'Budget', icon: 'card', href: '/budget' },
		{ id: 'category', text: 'Category', icon: 'category', href: '/category' },
		{ id: 'bank', text: 'Bank', icon: 'storage', href: '/bank' },
	] as AsideMenuItem[]}, []);

	const bottomMenuList = useMemo(() => { return [
		{ id: 'settings', text: 'Settings', icon: 'gear', href: '/settings' },
	] as AsideMenuItem[]}, []);


	const handleToggleAside = () => {
		if (isOpenAside) {
			setIsOpenAside(false);
			localStorage.setItem('asideopen', 'close');
		} else {
			setIsOpenAside(true);
			localStorage.setItem('asideopen', 'open');
		}
	}

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
      dispatch(setCategoryGroups(data.groups));
      dispatch(setCategories(data.categories));
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
  })

  return (
    <div class={getClassNames(['page-container', [ !isOpenAside, 'page-container--narrow-aside' ]])}>
      <Aside
				path={path}
				gnbMenuList={gnbMenuList}
				bottomMenuList={bottomMenuList}
				isNarrow={!isOpenAside}
				onToggleAside={handleToggleAside}
			/>
			<Router>
				<Route path="/" component={HomePage} />
				<Route path="/budget" component={BudgetPage} />
				<Route path="/category" component={CategoryPage} />
				<Route path="/bank" component={BankPage} />
				<Route path="/settings" component={SettingsPage} />
				<NotFoundPage default />
			</Router>
    </div>
  )
}

export default UserLoggedInPage;
