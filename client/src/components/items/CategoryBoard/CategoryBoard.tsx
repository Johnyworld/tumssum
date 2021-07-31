import { h, FunctionalComponent } from 'preact';
import { Account, CategoryGroup } from 'types';
import BoardItem from '~components/elements/BoardItem';
import Divider from '~components/elements/Divider';
import './CategoryBoard.scss';

interface CategoryBoardProps {
	categories: CategoryGroup[];
	data: Account[];
}

const CategoryBoard: FunctionalComponent<CategoryBoardProps> = ({ categories, data }) => {



	return (
		<div class='gap-big'>
			{ categories.map(group => (
				<div key={group.id} class='gap-small'>
					<Divider text={group.title || '미분류'} textSize='large' textPosition='left' />
					<div class='category-board-row'>
						{ group.categories && group.categories.map(category => (
							<BoardItem
								class='board-item-col-4'
								title={category.title}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	)
}

export default CategoryBoard;
