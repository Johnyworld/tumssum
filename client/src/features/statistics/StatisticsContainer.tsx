import { h, FunctionalComponent } from 'preact';
import { useMemo } from 'preact/hooks';
import { memo } from 'preact/compat';
import { combineBanksWithGroups } from '~pages/BankPage/BankPage';
import { combineCategoriesWithBudgets, combineCategoriesWithGroups } from '~pages/CategoryPage/CategoryPage';
import Statistics from '~pages/HomePage/Statistics';
import { useSelector } from '~utils/redux/hooks';


const StatisticsContainer: FunctionalComponent = ({  }) => {

	const { currentDate } = useSelector(state=> state.date);
	const { monthes } = useSelector(state=> state.month);
	const { accounts, loaded: accountLoaded } = useSelector(state=> state.account);
	const { budgets } = useSelector(state=> state.budget);
	const { categories, categoryGroups, loaded: categoryLoaded } = useSelector(state=> state.category);
	const { banks, bankGroups } = useSelector(state=> state.bank);

	const accountsThisMonth = useMemo(() => accounts.filter(account => account.datetime.substr(0, 7) === currentDate.substr(0, 7)), [accounts, currentDate]);
	const categoriesCombined = useMemo(() => combineCategoriesWithGroups(categories, categoryGroups), [categories, categoryGroups]);
	const categoriesCombinedWithBudgets = useMemo(() => combineCategoriesWithBudgets(categoriesCombined, budgets, currentDate), [categoriesCombined, budgets, currentDate]);
	const banksCombined = useMemo(() => combineBanksWithGroups(banks, bankGroups), [banks, bankGroups]);

	return (
		<Statistics
			date={currentDate}
			accounts={accountsThisMonth}
			categoriesCombined={categoriesCombinedWithBudgets}
			banksCombined={banksCombined}
			monthes={monthes}
			loaded={categoryLoaded && accountLoaded}
		/>
	)
}

export default memo(StatisticsContainer);
