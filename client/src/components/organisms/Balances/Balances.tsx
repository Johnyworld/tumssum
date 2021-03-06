import { h, FunctionalComponent } from 'preact';
import { Bank, BankGroup, Month } from 'types';
import AccordionTable from '~components/molecules/AccordionTable';
import { StatisticsItems } from '~pages/HomePage/Statistics';
import './Balances.scss';

export interface BalancesProps {
	date: string;
	banksCombined: BankGroup[];
	monthes: Month[];
	aligned: StatisticsItems;
}

interface StatisticsGroup extends BankGroup {
	expenditure: number;
	income: number;
	total: number;
	carry_over: number;
	items: StatisticsItem[];
}

interface StatisticsItem extends Bank {
	expenditure: number;
	income: number;
	total: number;
	carry_over: number;
}

const findMonthRecursive: (monthes: Month[], Y: number, M: number) => null | Month = (monthes, Y, M) => {
	const dateString = Y + '-' + (M < 10 ? '0'+M : M);
	const month = monthes.find(month => month.date === dateString);
	if (month) return month;
	else {
		if (M === 1) return findMonthRecursive(monthes, Y-1, 12);
		else return findMonthRecursive(monthes, Y, M-1);
	}
}

const findMonth = (bankId: number, months: Month[], date: string) => {
	const filtered = months.filter(month=> month.bank === bankId && month.date < date);
	if (!filtered.length) return null;
	if (filtered.length === 1) return filtered[0];
	const split = date.split('-');
	const Y = +split[0];
	const M = +split[1];
	return findMonthRecursive(filtered, Y, M);
}

const combineData = (banksGroup: BankGroup[], monthes: Month[], aligned: StatisticsItems, date: string) => {

	let all = {
		income: 0,
		expenditure: 0,
		total: 0,
		incomeWriteOnly: 0,
		expenditureWriteOnly: 0,
		totalWriteOnly: 0,
		carry_over: 0,
	};

	const data = banksGroup.map(group => {
		let income = 0;
		let expenditure = 0;
		let total = 0;
		let incomeWriteOnly = 0;
		let expenditureWriteOnly = 0;
		let totalWriteOnly = 0;
		let carry_over = 0;

		const groupItems = group.id ? group.items : [...group.items, { id: 0 }];

		const items = groupItems.map(bank => {
			const month = findMonth(bank.id, monthes, date);
			const itemIncome = aligned[bank.id]?.income || 0;
			const itemExpenditure = aligned[bank.id]?.expenditure || 0;
			const itemTotal = aligned[bank.id]?.total || 0;
			const itemIncomeWriteOnly = aligned[bank.id]?.incomeWriteOnly || 0;
			const itemExpenditureWriteOnly = aligned[bank.id]?.expenditureWriteOnly || 0;
			const itemTotalWriteOnly = aligned[bank.id]?.totalWriteOnly || 0;
			const itemCarryOver = month ? month.date === date.substr(0, 7) ? month.carry_over : month.balance : 0;
			income += itemIncome;
			expenditure += itemExpenditure;
			total += itemTotal;
			incomeWriteOnly += itemIncomeWriteOnly;
			expenditureWriteOnly += itemExpenditureWriteOnly;
			totalWriteOnly += itemTotalWriteOnly;
			carry_over += itemCarryOver;
			all.income += itemIncome;
			all.expenditure += itemExpenditure;
			all.total += itemTotal;
			all.incomeWriteOnly += itemIncomeWriteOnly;
			all.expenditureWriteOnly += itemExpenditureWriteOnly;
			all.totalWriteOnly += itemTotalWriteOnly;
			all.carry_over += itemCarryOver;
			return {
				...bank,
				carry_over: itemCarryOver,
				total: itemTotal,
			} as StatisticsItem;
		});

		return {
			...group,
			income,
			expenditure,
			total,
			incomeWriteOnly,
			expenditureWriteOnly,
			totalWriteOnly,
			carry_over,
			items,
		} as StatisticsGroup;
	})
	
	return { data, all }
}

const Balances: FunctionalComponent<BalancesProps> = ({ date, banksCombined, monthes, aligned }) => {

	const { data, all } = combineData(banksCombined, monthes, aligned, date);

	return (
		<div class='balances card'>
			<h3 class='p-small'>??????</h3>
			<AccordionTable.Head head={['??????', '?????????', '??????']} />

			{ data.map(group => group.items.length > 0 && (
				<AccordionTable
					group={[ group.title === undefined ? '?????? ?????????' : group.title || '?????? ??????', group.carry_over, group.carry_over + group.total ]}
					items={group.items.map(bank => {
						return [
							bank.title === undefined ? '???????????? ?????????' : bank.title || '?????? ??????',
							bank.carry_over,
							bank.carry_over + bank.total,
						]
					})}
				>
				</AccordionTable>
			))}

			<AccordionTable.Head head={['??????', '??????', '??????']} />
			
			<AccordionTable
				group={[ '??? ??????', 0, all.expenditureWriteOnly ]}
			/>

			<AccordionTable
				group={[ '??? ??????', 0, all.incomeWriteOnly ]}
			/>

			<AccordionTable
				group={[ '??? ??????', 0, all.expenditureWriteOnly + all.incomeWriteOnly ]}
			/>

			<AccordionTable
				colors={[ null, null, 'gray' ]}
				group={[ '????????? ??????', null, all.carry_over ]}
			/>

			<AccordionTable
				group={[ '?????? ??????', 0, all.carry_over + all.totalWriteOnly ]}
			/>

		</div>
	)
}

export default Balances;
