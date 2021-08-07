import { h, FunctionalComponent } from 'preact';
import { Account, Category, CategoryGroup, Vec2 } from 'types';
import BoardItem from '~components/elements/BoardItem';
import { GrappingData } from '~hooks/useDrag';
import { combineCategoriesWithGroups } from '~routes/CategoryPage/CategoryPage';
import AccountItem from '../AccountItem';
import './CategoryBoard.scss';

interface CategoryBoardProps {
	categories: Category[];
	categoryGroups: CategoryGroup[];
	data: Account[];
	grapping?: GrappingData<Account> | null;
	grappingPos?: Vec2 | null;
	onGrap?: (data: Account) => (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onDropToUpdate?: (categoryId: number | null, categoryTitle: string) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onDrop?: () => void;
	onDragging?: (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onClick?: (account: Account) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onClickPlus?: (categoryId: number) => () => void;
}

const getDataAligned = (data: Account[]) => {
	const results: {[x:string]: Account[]} = {}
	for ( const item of data ) {
		const category = item.category || 'EMPTY';
		if (!results[category]) results[category] = [];
		results[category].push(item);
	}
	return results;
}

const combineCategoriesWithData = (categories: CategoryGroup[], alignedData: {[x:string]: Account[]}) => {
	return categories.map(group => {
		return { ...group, items: group.items.map(category => {
			return {
				...category,
				accounts: alignedData[category.id],
			}
		})}
	});
}


const CategoryBoard: FunctionalComponent<CategoryBoardProps> = ({ categories, categoryGroups, data, grapping, grappingPos, onGrap, onDropToUpdate, onDrop, onDragging, onClick, onClickPlus }) => {

	const combined = combineCategoriesWithGroups(categories, categoryGroups);
	const alignedData = getDataAligned(data);
	const categoriesWithData = combineCategoriesWithData(combined, alignedData);

	return (
		<div class='category-board' onMouseMove={onDragging} onMouseUp={onDrop}>
			<div class='gap-medium'>
				<div class='gap-tiny'>
					<p class='c-gray f-small f-bold'>미분류</p>
					<div class='category-board-row'>
						<BoardItem
							title='미분류'
							isGrapping={!!grapping}
							onDropToUpdate={onDropToUpdate && onDropToUpdate( null, '' )}
							children={
								<div class='grid grid-col-4 grid-gap-tiny' style={{ flexWrap: 'wrap' }}>
									{ alignedData.EMPTY && alignedData.EMPTY.map(account => (
										<AccountItem
											title={account.title}
											amount={account.account}
											onClick={onClick && onClick(account)}
											onMouseDown={onGrap ? onGrap(account) : undefined}
										/>
									))}
								</div>
							}
						/>
					</div>
				</div>
				{ categoriesWithData.map(group => (
					<div key={group.id} class='gap-tiny'>
						<p class='c-gray f-small f-bold'>{group.title || '카테고리 그룹 없음'}</p>
						<div class='category-board-row'>
							{ group.items && group.items.map(category => (
								<BoardItem
									class='board-item--col-4'
									title={category.title}
									isGrapping={!!grapping}
									onDropToUpdate={onDropToUpdate && onDropToUpdate( category.id, category.title )}
									onClickPlus={onClickPlus && onClickPlus(category.id)}
									children={category.accounts && category.accounts.map(account => (
										<AccountItem
											title={account.title}
											amount={account.account}
											onClick={onClick && onClick(account)}
											onMouseDown={onGrap ? onGrap(account) : undefined}
										/>
									))}
								/>
							))}
						</div>
					</div>
				))}
			</div>

			{ grapping && grappingPos &&
				<AccountItem
					title={grapping.data.title}
					amount={grapping.data.account}
					class='calendar-grapping'
					style={{ left: grappingPos.x, top: grappingPos.y, width: grapping.width, height: grapping.height }} 
				/>
			}
		</div>
	)
}

export default CategoryBoard;
