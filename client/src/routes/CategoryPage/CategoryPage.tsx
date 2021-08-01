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
	const alignedCalendar = getCategoriesAligned(categories);
	const groups: CategoryGroup[] = categoryGroups.map(group => {
		return {
			...group,
			items: alignedCalendar[group.id] || [],
		}
	});
	return [...groups, { items: alignedCalendar.EMPTY || [] } as CategoryGroup]
}

const CategoryPage: FunctionalComponent = ({  }) => {

	const { categories, categoryGroups } = useSelector(state=> state.category);

	const { detailView, handleCloseDetail, handleViewDetail } = useDetails<Category>();

	const combined = combineCategoriesWithGroups(categories, categoryGroups);

	const { grapping, grappingPos, isDragging, handleGrap, handleDrop, handleDragging } = useDrag(categories);

	const { handleUpdateCategory, handleDropToUpdateCategory } = useCategory({ grapping, handleDrop });

	return (
		<div class='category-page wrap' >
			<Header>
				<h1>카테고리 관리</h1>
			</Header>
			<Indicator flexEnd>
				<Button size='small' color='gray' children='+ 그룹 추가' />
				<Button size='small' children='+ 카테고리 추가' />
			</Indicator>

			<ManagementList
				data={combined}
				grapping={grapping}
				grappingPos={grappingPos}
				isDragging={isDragging}
				onGrap={handleGrap}
				onDropToUpdate={handleDropToUpdateCategory}
				onDrop={handleDrop}
				onDragging={handleDragging}
				onUpdate={handleUpdateCategory}
				onClick={handleViewDetail}
			/>
		</div>
	)
}


export default CategoryPage;


