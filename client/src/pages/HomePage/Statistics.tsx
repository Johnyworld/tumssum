import { h, FunctionalComponent, Fragment } from 'preact';
import { Account, Bank, BankGroup, CategoryGroup, Month } from 'types';
import Balances from '~components/organisms/Balances';
import CategoryStatistics from '~components/organisms/CategoryStatistics';

export interface StatisticsProps {
	date: string;
	accounts: Account[];
	categoriesCombined: CategoryGroup[];
	banksCombined: BankGroup[];
	monthes: Month[];
	loaded: boolean;
}


export interface StatisticsItems {
	[x: number]: StatisticsItem;
}

interface StatisticsItem {
	expenditure: number;
	income: number;
	total: number // Send, Modify 포함
	expenditureWriteOnly: number;
	incomeWriteOnly: number;
	totalWriteOnly: number // Send, Modify 비포함
}


const getDataAligned = (data: Account[]) => {
	// WRITE: account를 bank에 더한다.
	// SEND: account를 bank에서 빼고 to에 더한다.
	// MODIFY: account를 to에 더한다.
	const banks: StatisticsItems = {}
	const categories: StatisticsItems = {}

	for ( const item of data ) {

		const type = !item.to ? 'WRITE' : !item.bank ? 'MODIFY' : 'SEND';
		const key = item.account < 0 ? 'expenditure' : 'income';

		const bank = item.bank || 0;
		const to = item.to || 0;

		if (!banks[bank]) banks[bank] = { income: 0, expenditure: 0, total: 0, expenditureWriteOnly: 0, incomeWriteOnly: 0, totalWriteOnly: 0 };
		if (!banks[to]) banks[to] = { income: 0, expenditure: 0, total: 0, expenditureWriteOnly: 0, incomeWriteOnly: 0, totalWriteOnly: 0 };

		if (type === 'WRITE') {
			banks[bank][key] += item.account;
			banks[bank].total += item.account;
			banks[bank][`${key}WriteOnly`] += item.account;
			banks[bank].totalWriteOnly += item.account;
		} else if (type === 'SEND') {
			banks[bank][key] -= item.account;
			banks[bank].total -= item.account;
			banks[to][key] += item.account;
			banks[to].total += item.account;
		} else if (type === 'MODIFY') {
			banks[to][key] += item.account;
			banks[to].total += item.account;
		}

		if (item.to) continue; // 뱅크 to 뱅크로 전송한 기록은, Category 통계에 포함하지 않습니다.

		const category = item.category || 0;
		if (!categories[category]) categories[category] = { income: 0, expenditure: 0, total: 0, expenditureWriteOnly: 0, incomeWriteOnly: 0, totalWriteOnly: 0 };
		if (item.account < 0) categories[category].expenditure += item.account;
		if (item.account >= 0) categories[category].income += item.account;
		categories[category].total += item.account;
	}
	return { banks, categories };
}


const Statistics: FunctionalComponent<StatisticsProps> = ({ date, accounts, categoriesCombined, banksCombined, monthes, loaded }) => {

	const aligned = getDataAligned(accounts);
	console.log('===== Statistics', accounts, aligned);

	return (
		<Fragment>
			<CategoryStatistics categoriesCombined={categoriesCombined} aligned={aligned.categories} loaded={loaded} />
			<Balances date={date} banksCombined={banksCombined} monthes={monthes} aligned={aligned.banks} />
		</Fragment>
	)
}

export default Statistics;
