import { h, FunctionalComponent } from 'preact';
import { Category, CategoryGroup } from 'types';
import Button from '~components/elements/Button';
import Header from '~components/layouts/Header';
import useCategory from '~hooks/useCategory';
import useDrag from '~hooks/useDrag';
import { useSelector } from '~utils/redux/hooks';
import Indicator from '~components/layouts/Indicator';
import useDetails from '~hooks/useDetails';
import ManagementList from '~components/items/ManagementList';
import Modal from '~components/layouts/Modal';
import CategoryFormModal from '~components/partials/CategoryFormModal';
import CategoryGroupFormModal from '~components/partials/CategoryGroupFormModal';
import { useCallback } from 'preact/hooks';


export const getCategoryGroups = (groups: CategoryGroup[]) => {
	return groups.reduce((prev, curr) => {
		curr.categories = [];
		if (!curr.id) return prev;
		return [...prev, curr];
	}, [] as CategoryGroup[]);
}

export const getCategories = (categories: CategoryGroup[]) => {
	return categories.reduce((prev, curr) => {
		return [...prev, ...curr.categories!];
	}, [] as Category[]);
}

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

const CategoryPage: FunctionalComponent = ({  }) => {

	const { categories, categoryGroups } = useSelector(state=> state.category);

	const { detailView, handleCloseDetail, handleViewDetail } = useDetails<Category>();
	const { detailView: detailViewGroup, handleCloseDetail: handleCloseDetailGroup, handleViewDetail: handleViewDetailGroup } = useDetails<CategoryGroup>();

	const closeDetails = useCallback(() => {
		handleCloseDetail();
		handleCloseDetailGroup();
	}, []);

	const combined = combineCategoriesWithGroups(categories, categoryGroups);

	const { grapping, grappingPos, isDragging, handleGrap, handleDrop, handleDragging } = useDrag(categories);

	const {
		focusGroup,
		focusItem,
		handleUpdateCategoryGroup,
		handleUpdateCategory,
		handleDropToUpdateCategory,
		handleAddCategoryGroup,
		handleAddCategory,
		handleRemoveCategoryGroup,
		handleRemoveCategory
	} = useCategory({ grapping, onCloseDetail: closeDetails, handleDrop });



	return (
		<div class='category-page wrap' >

			<Header>
				<h1>카테고리 관리</h1>
			</Header>

			<Indicator flexEnd>
				<Button size='small' onClick={handleAddCategoryGroup} color='gray' children='+ 그룹 추가' />
				<Button size='small' onClick={handleAddCategory} children='+ 카테고리 추가' />
			</Indicator>

			<ManagementList
				data={combined}
				grapping={grapping}
				grappingPos={grappingPos}
				focusGroup={focusGroup}
				focusItem={focusItem}
				isDragging={isDragging}
				onGrap={handleGrap}
				onDropToUpdate={handleDropToUpdateCategory}
				onDrop={handleDrop}
				onDragging={handleDragging}
				onUpdate={handleUpdateCategory}
				onClick={handleViewDetail}
				onClickGroup={handleViewDetailGroup}
			/>

			<Modal isOpen={!!detailView} onClose={handleCloseDetail}>
				{ detailView &&
					<CategoryFormModal
						category={detailView}
						groupList={categoryGroups}
						onConfirm={handleUpdateCategory}
						onDelete={handleRemoveCategory}
					/>
				}
			</Modal>

			<Modal isOpen={!!detailViewGroup} onClose={handleCloseDetailGroup}>
				{ detailViewGroup &&
					<CategoryGroupFormModal
						group={detailViewGroup}
						onConfirm={handleUpdateCategoryGroup}
						onDelete={handleRemoveCategoryGroup}
					/>
				}
			</Modal>

		</div>
	)
}


export default CategoryPage;


