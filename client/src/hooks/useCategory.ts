import { useCallback, useState } from 'preact/hooks';
import { Budget, Category, CategoryGroup } from 'types';
import { addOrUpdateBudget, removeBudget } from '~stores/budgetSlice';
import { addCategories, addCategory, addCategoryGroup, removeCategory, removeCategoryGroup, updateCategory, updateCategoryGroup } from '~stores/categorySlice';
import { useDispatch } from '~utils/redux/hooks';
import { grabbingData } from './useDrag';
import useFetch from './useFetch';
import useConfirm from "./useConfirm";
import useToast from "./useToast";

interface UseCategory {
	grabbing: grabbingData<Category> | null;
	onCloseDetail: () => void;
	handleDrop: () => void;
}

export default ({ grabbing, onCloseDetail, handleDrop }: UseCategory) => {
	
	const dispatch = useDispatch();
	const confirm = useConfirm();
	const toast = useToast();

	const postCategoryGroup = useFetch<CategoryGroup>({
		method: 'POST',
		url: '/api/category-group/',
		onSuccess: data => {
			dispatch(addCategoryGroup(data));
		}
	})

	const postCategory = useFetch<Category>({
		method: 'POST',
		url: '/api/category/',
		onSuccess: data => {
			dispatch(addCategory(data));
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

	const putCategory = useFetch<{ category: Category, budget: Budget | number }>({
		method: 'PUT',
		url: '/api/category/',
		onSuccess: data => {
			dispatch(updateCategory(data.category));
			if (data.budget) {
				if (typeof data.budget === 'number') dispatch(removeBudget(data.budget));
				else dispatch(addOrUpdateBudget(data.budget));
			}
			onCloseDetail();
		}
	});

	const patchCategory = useFetch<Category>({
		method: 'PATCH',
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
			toast('삭제되었습니다.', 'green');
			dispatch(removeCategoryGroup(data.id));
			dispatch(addCategories(data.items));
			onCloseDetail();
		}
	})

	const deleteCatogory = useFetch<number>({
		method: 'DELETE',
		url: '/api/category/',
		onSuccess: data => {
			toast('삭제되었습니다.', 'green');
			dispatch(removeCategory(data));
			onCloseDetail();
		}
	})

	const handleAddCategoryGroup = useCallback(() => {
		if ( postCategoryGroup.loading ) return;
		postCategoryGroup.call({
			title: '',
		});
	}, [postCategoryGroup.loading]);

	const handleAddCategory = useCallback(() => {
		if ( postCategory.loading ) return;
		postCategory.call({
			title: '',
		});
	}, [postCategory.loading]);

	const handleUpdateCategoryGroup = useCallback((group: CategoryGroup) => {
		if ( putCategoryGroup.loading ) return;
		putCategoryGroup.call({
			category_group_id: group.id,
			title: group.title,
		})
	}, [putCategoryGroup.loading]);

	const handleUpdateCategory = useCallback((category: Category, budget: number | null, date: string) => {
		if ( putCategory.loading ) return;
		putCategory.call({
			category_id: category.id,
			group_id: category.group,
			title: category.title,
			memo: category.memo,
			budget,
			date,
		})
	}, [putCategory.loading]);

	const handleDropToUpdateCategory = useCallback((groupId: number | null) => () => {
		if (patchCategory.loading || !grabbing ) return;
		if (groupId === grabbing.data.group) {
			handleDrop();
			return;
		}
		patchCategory.call({
			category_id: grabbing.data.id,
			group_id: groupId || null
		})
		dispatch(updateCategory({ id: grabbing.data.id, group: groupId } as Category));
		handleDrop();
	}, [patchCategory.loading, grabbing?.data]);

	const handleRemoveCategoryGroup = useCallback((id: number) => () => {
		if (deleteCatogoryGroup.loading) return;
		confirm('정말 삭제할까요?', () => {
			deleteCatogoryGroup.call({
				category_group_id: id
			});
		});
	}, [deleteCatogoryGroup.loading]);

	const handleRemoveCategory = useCallback((id: number) => () => {
		if (deleteCatogory.loading) return;
		confirm('정말 삭제할까요?', () => {
			deleteCatogory.call({
				category_id: id
			});
		})
	}, [deleteCatogory.loading]);

	
	return {
		handleUpdateCategory,
		handleUpdateCategoryGroup,
		handleDropToUpdateCategory,
		handleAddCategoryGroup,
		handleAddCategory,
		handleRemoveCategoryGroup,
		handleRemoveCategory,
	};
}