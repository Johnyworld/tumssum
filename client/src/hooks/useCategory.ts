import { Category } from 'types';
import { updateCategory } from '~features/category/categorySlice';
import { useDispatch } from '~utils/redux/hooks';
import { GrappingData } from './useDrag';
import useFetch from './useFetch';

interface UseCategory {
	grapping: GrappingData<Category> | null;
	handleDrop: () => void;
}

export default ({ grapping, handleDrop }: UseCategory) => {
	
	const dispatch = useDispatch();

	const callUpdateCategory = useFetch<Category>({
		method: 'PUT',
		url: '/api/category/',
		onSuccess: data => {
			dispatch(updateCategory(data));
		}
	});

	const handleUpdateCategory = (category: Category) => {
		callUpdateCategory.call({
			category_id: category.id,
			title: category.title,
		})
	}


	const handleDropToUpdateCategory = (groupId: number | null) => () => {
		if (callUpdateCategory.loading || !grapping ) return;
		if (groupId === grapping.data.group) {
			handleDrop();
			return;
		}
		callUpdateCategory.call({
			category_id: grapping.data.id,
			group_id: groupId
		})
		dispatch(updateCategory({ id: grapping.data.id, group: groupId } as Category));
		handleDrop();
	}

	
	return {
		handleUpdateCategory,
		handleDropToUpdateCategory,
	};
}