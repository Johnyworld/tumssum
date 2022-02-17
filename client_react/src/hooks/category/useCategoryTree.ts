import categoryUtil from '~/utils/categoryUtil';
import { useSelector } from '~/utils/reduxHooks';

const useCategoryTree = () => {
  const categoryGroups = useSelector(state => state.category.categoryGroups);
  const categories = useSelector(state => state.category.categories);
  const budgets = useSelector(state => state.budget.budgets);
  const categoryTree = categoryUtil.getCategoryTree(categoryGroups, categories, budgets);

  return categoryTree || [];
};

export default useCategoryTree;
