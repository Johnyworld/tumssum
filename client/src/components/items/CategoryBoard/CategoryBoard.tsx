import { h, FunctionalComponent } from 'preact';
import { CategoryGroup } from 'types';
import Divider from '~components/elements/Divider';
import './CategoryBoard.scss';

interface CategoryBoardProps {
	categories: CategoryGroup[];
}

const CategoryBoard: FunctionalComponent<CategoryBoardProps> = ({ categories }) => {
	return (
		<div class='gap-big'>
			{ categories.map(group => (
				<div key={group.id} class='gap-small'>
					<Divider text={group.title || '미분류'} textSize='large' textPosition='left' />
					<div class='category-board-row'>
						{ group.categories && group.categories.map(category => (
							<div class='category-board-col never-drag gap-tiny' key={category.id}>
								<p>{category.title}</p>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}

export default CategoryBoard;
