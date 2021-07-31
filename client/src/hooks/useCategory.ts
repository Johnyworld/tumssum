import { Category } from 'types';
import { updateCategory } from '~features/category/categorySlice';
import { useDispatch } from '~utils/redux/hooks';
import useFetch from './useFetch';


export default () => {
	
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

	
	return {
		handleUpdateCategory
	};
}