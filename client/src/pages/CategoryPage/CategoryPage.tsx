import { h, FunctionalComponent } from 'preact';
import { Budget, Category, CategoryGroup } from 'types';
import Button from '~components/atoms/Button';
import Header from '~components/layouts/Header';
import useCategory from '~hooks/useCategory';
import useDrag from '~hooks/useDrag';
import { useSelector } from '~utils/redux/hooks';
import useDetails from '~hooks/useSelectItem';
import ManagementList from '~components/molecules/ManagementList';
import Modal from '~components/layouts/Modal';
import CategoryFormModal from '~components/organisms/CategoryFormModal';
import CategoryGroupFormModal from '~components/organisms/CategoryGroupFormModal';
import { useCallback, useMemo } from 'preact/hooks';
import budgetUtils from '~utils/budgetUtils';
import { getLocalString } from '~utils/calendar';
import useConfirm from '~hooks/useConfirm';


const getCategoriesAligned = (categories: Category[]) => {
	const results: {[x:string]: Category[]} = {}
	for ( const item of categories ) {
		const key = item.group || 'EMPTY';
		if (!results[key]) results[key] = [];
		results[key].push(item);
	}
	return results;
}


export const combineCategoriesWithGroups = (categories: Category[], categoryGroups: CategoryGroup[]) => {
	const aligned = getCategoriesAligned(categories);
	const groups: CategoryGroup[] = categoryGroups.map(group => {
		return {
			...group,
			items: aligned[group.id] || [],
		}
	});
	return [...groups, { items: aligned.EMPTY || [] } as CategoryGroup]
}

export const combineCategoriesWithBudgets = (categories: CategoryGroup[], budgets: Budget[], currentDate: string) => {
	return categories.map(group => {
		let groupBudget = 0;
		return {
			...group,
			items: group.items.map(category => {
				const budget = budgetUtils.getBudgetOfCategory(category.id, budgets, currentDate);
				if (budget) groupBudget += budget;
				return {
					...category,
					budget,
				}
			}),
			budget: groupBudget,
		}
	})
}

const CategoryPage: FunctionalComponent = ({  }) => {

	const { categories, categoryGroups } = useSelector(state=> state.category);
	const { budgets } = useSelector(state=> state.budget);
	const today = getLocalString().substr(0, 7);

	const confirm = useConfirm();

	const { selectedItem, handleClearSelectedItem, handleSelectItem } = useDetails<Category>();
	const { selectedItem: selectedGroupItem, handleClearSelectedItem: handleClearSelectedGroupItem, handleSelectItem: handleSelectGroupItem } = useDetails<CategoryGroup>();

	const closeDetails = useCallback(() => {
		handleClearSelectedItem();
		handleClearSelectedGroupItem();
	}, []);

	const combined = useMemo(() => combineCategoriesWithGroups(categories, categoryGroups), [categories, categoryGroups]);
	const combinedWithBudgets = useMemo(() => combineCategoriesWithBudgets(combined, budgets, today), [combined, budgets]);

	const { grabbing, grabbingPos, isDragging, handleGrap, handleDrop, handleDragging } = useDrag(categories);

	const {
		handleUpdateCategoryGroup,
		handleUpdateCategory,
		handleDropToUpdateCategory,
		handleAddCategoryGroup,
		handleAddCategory,
		handleRemoveCategoryGroup,
		handleRemoveCategory
	} = useCategory({ grabbing, onCloseDetail: closeDetails, handleDrop });


	return (
		<main class='category-page' >
			<Header title='???????????? ??????' />
			<div class='wrap gap-mv-large'>


				<div class='flex flex-end gap-small'>
					<Button size='small' onClick={handleAddCategoryGroup} color='gray' children='+ ?????? ??????' />
					<Button size='small' onClick={handleAddCategory} children='+ ???????????? ??????' />
				</div>

				<ManagementList
					data={combinedWithBudgets}
					grabbing={grabbing}
					grabbingPos={grabbingPos}
					onGrap={handleGrap}
					onDropToUpdate={handleDropToUpdateCategory}
					onDrop={handleDrop}
					onDragging={handleDragging}
					onClick={handleSelectItem}
					onClickGroup={handleSelectGroupItem}
				/>

				<Modal isOpen={!!selectedItem} >
					{ selectedItem &&
						<CategoryFormModal
							category={selectedItem}
							groupList={categoryGroups}
							currentDate={today}
							confirm={confirm}
							onConfirm={handleUpdateCategory}
							onDelete={handleRemoveCategory}
							onClose={handleClearSelectedItem}
						/>
					}
				</Modal>

				<Modal isOpen={!!selectedGroupItem} >
					{ selectedGroupItem &&
						<CategoryGroupFormModal
							group={selectedGroupItem}
							onConfirm={handleUpdateCategoryGroup}
							onDelete={handleRemoveCategoryGroup}
							onClose={handleClearSelectedGroupItem}
						/>
					}
				</Modal>

			</div>
		</main>
	)
}


export default CategoryPage;


