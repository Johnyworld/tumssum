import { h, FunctionalComponent } from 'preact';
import { Category, CategoryGroup } from 'types';
import PieGraph from '~components/atoms/PieGraph';
import AccordionTable from '~components/molecules/AccordionTable';
import NavigationMenu from '~components/molecules/NavigationMenu';
import useStatistics from '~hooks/statisticsHooks';
import { StatisticsItems } from '~pages/HomePage/Statistics';
import './CategoryStatistics.scss';

export interface StatisticsProps {
	categoriesCombined: CategoryGroup[];
	aligned: StatisticsItems;
	loaded: boolean;
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

	let totals = {
		income: 0,
		expenditure: 0,
		total: 0,
	};

	let categories: StatisticsItem[] = [];

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
			totals.income += itemIncome;
			expenditure += itemExpenditure;
			totals.expenditure += itemExpenditure;
			total += itemTotal;
			totals.total += itemTotal;

			const results = {
				...category,
				income: itemIncome,
				expenditure: itemExpenditure,
				total: itemTotal,
			} as StatisticsItem;
			
			categories.push(results);
			return results;
		});

		return {
			...group,
			income,
			expenditure,
			total,
			items,
		} as StatisticsGroup;
	})
	
	return { data, totals, categories }
}

const CategoryStatistics: FunctionalComponent<StatisticsProps> = ({ categoriesCombined, aligned, loaded }) => {

	const { data, totals, categories } = combineData(categoriesCombined, aligned);

	const {
		navigationMenu,
		handleChangeMenu,
	} = useStatistics.useNavigation();

	return (
		<div class='category-statistics card'>

			<div class='flex p-small'> 
				<h3>?????? ??? ??????</h3>
				<NavigationMenu
					selected={navigationMenu.currentMenu}
					onChange={handleChangeMenu}
					hideText='always'
					list={navigationMenu.menus}
				/>
			</div>

			{ navigationMenu.currentMenu === 'graph' &&
				<div class='p-regular gap-mv-regular' >
					<PieGraph loaded={loaded} data={data.filter(item => item.expenditure < 0).map(item => {
						return {
							id: item.id+'',
							text: item.title || (item.id ? '?????? ??????' : '?????? ?????????'),
							value: item.expenditure,
						}
					})} />
					<PieGraph loaded={loaded} data={categories.filter(item => item.expenditure < 0).map(item => {
						return {
							id: item.id+'',
							text: item.title || (item.id ? '?????? ??????' : '?????? ?????????'),
							value: item.expenditure,
						}
					})} />
				</div>
			}

			{ navigationMenu.currentMenu === 'list' &&
				<div>
					<AccordionTable.Head head={['????????????', '??????', '??????']} />
		
					{ data.map(group => group.items.length > 0 && (
						<AccordionTable
							group={[ group.title === undefined ? '?????? ?????????' : group.title || '?????? ??????', group.budget || 0, group.total ]}
							items={group.items.map(category => {
								return [ category.title === undefined ? '???????????? ?????????' : category.title || '?????? ??????', category.budget || 0, category.total ]
							})}
						>
						</AccordionTable>
					))}
				</div>
			}

		</div>
	)
}

export default CategoryStatistics;
