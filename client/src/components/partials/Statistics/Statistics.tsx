import { h, FunctionalComponent } from 'preact';
import { Account, Category, CategoryGroup } from 'types';
import StatisticsTable from '~components/items/StatisticsTable';
import './Statistics.scss';

export interface StatisticsProps {
	accounts: Account[];
	categoriesCombined: CategoryGroup[];
}


interface StatisticsItems {
	[x: number]: {
		expenditure: number;
		income: number;
		total: number;
	}
}

interface StatisticsGroup extends CategoryGroup {
	expenditure: number;
	income: number;
	total: number;
	items: StatisticsItem[];
}

interface StatisticsItem extends Category {
	expenditure: number;
	income: number;
	total: number;
}


const getDataAligned = (data: Account[]) => {
	const results: StatisticsItems = {}
	for ( const item of data ) {
		const category = item.category || 0;
		if (!results[category]) results[category] = { income: 0, expenditure: 0, total: 0 };
		if (item.account < 0) results[category].expenditure += item.account;
		if (item.account >= 0) results[category].income += item.account;
		results[category].total += item.account;
	}
	return results;
}


const combineData = (categoriesCombined: CategoryGroup[], aligned: StatisticsItems) => {

	let all = {
		income: 0,
		expenditure: 0,
		total: 0,
	};

	const data = categoriesCombined.map(group => {
		let income = 0;
		let expenditure = 0;
		let total = 0;

		const groupItems = group.id ? group.items : [...group.items, { id: 0 }];

		const items = groupItems.map(category => {
			const itemIncome = aligned[category.id]?.income || 0;
			const itemExpenditure = aligned[category.id]?.expenditure || 0;
			const itemTotal = aligned[category.id]?.total || 0;
			income += itemIncome;
			all.income += itemIncome;
			expenditure += itemExpenditure;
			all.expenditure += itemExpenditure;
			total += itemTotal;
			all.total += itemTotal;
			return {
				...category,
				total: itemTotal,
			} as StatisticsItem;
		});

		return {
			...group,
			income,
			expenditure,
			total,
			items,
		} as StatisticsGroup;
	})
	
	return { data, all }
}


const Statistics: FunctionalComponent<StatisticsProps> = ({ accounts, categoriesCombined }) => {

	const aligned = getDataAligned(accounts);
	const { data, all } = combineData(categoriesCombined, aligned);

	return (
		<div class='statistics card'>
			<h3 class='p-small'>이번 달 통계</h3>
		
			<StatisticsTable.Head head={['카테고리', '예산', '소비']} />

			{ data.map(group => group.items.length > 0 && (
				<StatisticsTable
					group={[ group.title === undefined ? '그룹 미분류' : group.title || '이름 없음', 0, group.total ]}
					items={group.items.map(category => {
						return [ category.title === undefined ? '카테고리 미분류' : category.title || '이름 없음', 0, category.total ]
					})}
				>
				</StatisticsTable>
			))}

			<StatisticsTable.Head head={['합계', '예산', '소비']} />

			<StatisticsTable
				group={[ '월 지출', 0, all.expenditure ]}
			/>

			<StatisticsTable
				group={[ '월 수입', 0, all.income ]}
			/>

			<StatisticsTable
				group={[ '월 손익', 0, all.expenditure + all.income ]}
			/>

			<StatisticsTable
				colors={[ null, null, 'gray' ]}
				group={[ '지난달 이월', null, 0 ]}
			/>

			<StatisticsTable
				group={[ '남은 금액', 0, 0 ]}
			/>

		</div>
	)
}

export default Statistics;
