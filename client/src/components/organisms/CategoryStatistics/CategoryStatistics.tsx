import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Category, CategoryGroup, IconType } from 'types';
import PieGraph from '~components/atoms/PieGraph';
import AccordionTable from '~components/molecules/AccordionTable';
import NavigationMenu from '~components/molecules/NavigationMenu';
import useNavigationMenu from '~hooks/useNavigationMenu';
import { StatisticsItems } from '~routes/HomePage/Statistics';
import './CategoryStatistics.scss';

export interface StatisticsProps {
	categoriesCombined: CategoryGroup[];
	aligned: StatisticsItems;
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

const Statistics: FunctionalComponent<StatisticsProps> = ({ categoriesCombined, aligned }) => {

	const { data, all } = combineData(categoriesCombined, aligned);
	
	console.log('===== CategoryStatistics', data, all);

	const navigationMenu = useNavigationMenu<'graph' | 'list'>([
		{ id: 'graph', icon: 'graph' as IconType },
		{ id: 'list', icon: 'menu' as IconType },
	]);

	return (
		<div class='category-statistics card'>

			<div class='flex p-small'> 
				<h3>이번 달 통계</h3>
				<NavigationMenu
					selected={navigationMenu.currentMenu}
					onChange={navigationMenu.handleChangeMenu}
					hideText='always'
					list={navigationMenu.menus}
				/>
			</div>

			{ navigationMenu.currentMenu === 'graph' &&
				<div>
					<PieGraph data={[
						{ id: '1', text: '1번', value: 50 },
						{ id: '2', text: '2번', value: 80 },
						{ id: '3', text: '3번', value: 130 },
						{ id: '4', text: '4번', value: 30 },
					]} />
				</div>
			}

			{ navigationMenu.currentMenu === 'list' &&
				<div>
					<AccordionTable.Head head={['카테고리', '예산', '소비']} />
		
					{ data.map(group => group.items.length > 0 && (
						<AccordionTable
							group={[ group.title === undefined ? '그룹 미분류' : group.title || '이름 없음', group.budget || 0, group.total ]}
							items={group.items.map(category => {
								return [ category.title === undefined ? '카테고리 미분류' : category.title || '이름 없음', category.budget || 0, category.total ]
							})}
						>
						</AccordionTable>
					))}
				</div>
			}

		</div>
	)
}

export default Statistics;
