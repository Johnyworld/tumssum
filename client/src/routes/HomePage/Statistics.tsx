import { h, FunctionalComponent, Fragment } from 'preact';
import { Ref } from 'preact/hooks';
import { Account, BankGroup, CategoryGroup, Month } from 'types';
import Balances from '~components/organisms/Balances';
import CategoryStatistics from '~components/organisms/CategoryStatistics';

export interface StatisticsProps {
	date: string;
	accounts: Account[];
	categoriesCombined: CategoryGroup[];
	banksCombined: BankGroup[];
	monthes: Month[];
}

export interface StatisticsItems {
	[x: number]: {
		expenditure: number;
		income: number;
		total: number
	};
}

const getDataAligned = (data: Account[]) => {
	const banks: StatisticsItems = {}
	const categories: StatisticsItems = {}
	for ( const item of data ) {
		const bank = item.bank || 0;
		if (!banks[bank]) banks[bank] = { income: 0, expenditure: 0, total: 0 };
		if (item.account < 0) banks[bank].expenditure += item.account;
		if (item.account >= 0) banks[bank].income += item.account;
		banks[bank].total += item.account;

		const category = item.category || 0;
		if (!categories[category]) categories[category] = { income: 0, expenditure: 0, total: 0 };
		if (item.account < 0) categories[category].expenditure += item.account;
		if (item.account >= 0) categories[category].income += item.account;
		categories[category].total += item.account;
	}
	return { banks, categories };
}


const Statistics: FunctionalComponent<StatisticsProps> = ({ date, accounts, categoriesCombined, banksCombined, monthes }) => {

	const aligned = getDataAligned(accounts);

	return (
		<Fragment>
			<CategoryStatistics categoriesCombined={categoriesCombined} aligned={aligned.categories} />
			<Balances date={date} banksCombined={banksCombined} monthes={monthes} aligned={aligned.banks} />
		</Fragment>
	)
}

export default Statistics;
