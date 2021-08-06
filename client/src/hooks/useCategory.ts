import { useState } from 'preact/hooks';
import { Category, CategoryGroup } from 'types';
import { addCategories, addCategory, addCategoryGroup, removeCategory, removeCategoryGroup, updateCategory, updateCategoryGroup } from '~features/category/categorySlice';
import { useDispatch } from '~utils/redux/hooks';
import { GrappingData } from './useDrag';
import useFetch from './useFetch';

interface UseCategory {
	grapping: GrappingData<Category> | null;
	onCloseDetail: () => void;
	handleDrop: () => void;
}

export default ({ grapping, onCloseDetail, handleDrop }: UseCategory) => {
	
	const dispatch = useDispatch();
	const [ focusItem, setFocusItem ] = useState<number | null>(null);
	const [ focusGroup, setFocusGroup ] = useState<number | null>(null);


	const postCategoryGroup = useFetch<CategoryGroup>({
		method: 'POST',
		url: '/api/category-group/',
		onSuccess: data => {
			dispatch(addCategoryGroup(data));
			setFocusGroup(data.id);
			setTimeout(() => setFocusGroup(null))
		}
	})

	const postCategory = useFetch<Category>({
		method: 'POST',
		url: '/api/category/',
		onSuccess: data => {
			dispatch(addCategory(data));
			setFocusItem(data.id);
			setTimeout(() => setFocusItem(null))
		}
	})

	const putCategoryGroup = useFetch<CategoryGroup>({
		method: 'PUT',
		url: '/api/category-group/',
		onSuccess: data => {
			dispatch(updateCategoryGroup(data));
			onCloseDetail();
		}
	});

	const putCategory = useFetch<Category>({
		method: 'PUT',
		url: '/api/category/',
		onSuccess: data => {
			dispatch(updateCategory(data));
			onCloseDetail();
		}
	});

	const deleteCatogoryGroup = useFetch<{ id: number, items: Category[] }>({
		method: 'DELETE',
		url: '/api/category-group/',
		onSuccess: data => {
			dispatch(removeCategoryGroup(data.id));
			dispatch(addCategories(data.items));
			onCloseDetail();
		}
	})

	const deleteCatogory = useFetch<number>({
		method: 'DELETE',
		url: '/api/category/',
		onSuccess: data => {
			dispatch(removeCategory(data));
			onCloseDetail();
		}
	})

	const handleAddCategoryGroup = () => {
		if ( postCategoryGroup.loading ) return;
		postCategoryGroup.call({
			title: '',
		});
	}

	const handleAddCategory = () => {
		if ( postCategory.loading ) return;
		postCategory.call({
			title: '',
		});
	}

	const handleUpdateCategoryGroup = (group: CategoryGroup) => {
		if ( putCategoryGroup.loading ) return;
		putCategoryGroup.call({
			category_group_id: group.id,
			title: group.title,
		})
	}

	const handleUpdateCategory = (category: Category) => {
		if ( putCategory.loading ) return;
		putCategory.call({
			category_id: category.id,
			group_id: category.group,
			title: category.title,
		})
	}

	const handleDropToUpdateCategory = (groupId: number | null) => () => {
		if (putCategory.loading || !grapping ) return;
		if (groupId === grapping.data.group) {
			handleDrop();
			return;
		}
		putCategory.call({
			category_id: grapping.data.id,
			group_id: groupId || null
		})
		dispatch(updateCategory({ id: grapping.data.id, group: groupId } as Category));
		handleDrop();
	}

	const handleRemoveCategoryGroup = (id: number) => () => {
		if (deleteCatogoryGroup.loading) return;
		deleteCatogoryGroup.call({
			category_group_id: id
		});
	}

	const handleRemoveCategory = (id: number) => () => {
		if (deleteCatogory.loading) return;
		deleteCatogory.call({
			category_id: id
		});
	}

	
	return {
		focusItem,
		focusGroup,
		handleUpdateCategory,
		handleUpdateCategoryGroup,
		handleDropToUpdateCategory,
		handleAddCategoryGroup,
		handleAddCategory,
		handleRemoveCategoryGroup,
		handleRemoveCategory,
	};
}