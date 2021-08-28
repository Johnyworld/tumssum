import { h, FunctionalComponent } from 'preact';
import { Bank, BankGroup, Month } from 'types';
import AccordionTable from '~components/molecules/AccordionTable';
import { StatisticsItems } from '~routes/HomePage/Statistics';
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

const findMonthRecursive: (monthes: Month[], Y: number, M: number, count: number) => null | Month = (monthes, Y, M, count) => {
	const dateString = Y + '-' + (M < 10 ? '0'+M : M);
	const month = monthes.find(month => month.date === dateString);
	if (month) return month;
	else if (count <= 0) return null;
	else {
		if (M === 1) return findMonthRecursive(monthes, Y-1, 12, count-1);
		else return findMonthRecursive(monthes, Y, M-1, count-1);
	}
}

const findMonth = (months: Month[], date: string) => {
	if (!months.length) return null;
	const split = date.split('-');
	const Y = +split[0];
	const M = +split[1];
	return findMonthRecursive(months, Y, M, months.length);
}

const combineData = (banksGroup: BankGroup[], monthes: Month[], aligned: StatisticsItems, date: string) => {

	let all = {
		income: 0,
		expenditure: 0,
		total: 0,
		carry_over: 0,
	};

	const data = banksGroup.map(group => {
		let income = 0;
		let expenditure = 0;
		let total = 0;
		let carry_over = 0;

		const groupItems = group.id ? group.items : [...group.items, { id: 0 }];

		const items = groupItems.map(bank => {
			const bankMonth = findMonth(monthes.filter(month=> month.bank === bank.id), date);
			const itemIncome = aligned[bank.id]?.income || 0;
			const itemExpenditure = aligned[bank.id]?.expenditure || 0;
			const itemTotal = aligned[bank.id]?.total || 0;
			const itemCarryOver = bankMonth ? bankMonth.balance : 0;
			income += itemIncome;
			all.income += itemIncome;
			expenditure += itemExpenditure;
			all.expenditure += itemExpenditure;
			total += itemTotal;
			all.total += itemTotal;
			carry_over += itemCarryOver;
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
			carry_over,
			items,
		} as StatisticsGroup;
	})
	
	return { data, all }
}

const Balances: FunctionalComponent<BalancesProps> = ({ date, banksCombined, monthes, aligned }) => {

	const { data, all } = combineData(banksCombined, monthes, aligned, date);

	console.log('===== Balances', data, all);

	return (
		<div class='balances card'>
			<h3 class='p-small'>잔고</h3>
			<AccordionTable.Head head={['뱅크', '지난달', '잔액']} />

			{ data.map(group => group.items.length > 0 && (
				<AccordionTable
					group={[ group.title === undefined ? '그룹 미분류' : group.title || '이름 없음', group.carry_over, group.carry_over + group.total ]}
					items={group.items.map(bank => {
						return [ bank.title === undefined ? '카테고리 미분류' : bank.title || '이름 없음', bank.carry_over, bank.carry_over + bank.total ]
					})}
				>
				</AccordionTable>
			))}

			<AccordionTable.Head head={['합계', '예산', '소비']} />
			
			<AccordionTable
				group={[ '월 지출', 0, all.expenditure ]}
			/>

			<AccordionTable
				group={[ '월 수입', 0, all.income ]}
			/>

			<AccordionTable
				group={[ '월 손익', 0, all.expenditure + all.income ]}
			/>

			<AccordionTable
				colors={[ null, null, 'gray' ]}
				group={[ '지난달 이월', null, all.carry_over ]}
			/>

			<AccordionTable
				group={[ '남은 금액', 0, all.carry_over + all.total ]}
			/>

		</div>
	)
}

export default Balances;
