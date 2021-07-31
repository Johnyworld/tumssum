import { h, FunctionalComponent } from 'preact';
import { Account, CategoryGroup, Vec2 } from 'types';
import BoardItem from '~components/elements/BoardItem';
import Divider from '~components/elements/Divider';
import { GrappingData } from '~hooks/useDrag';
import AccountItem from '../AccountItem';
import './CategoryBoard.scss';

interface CategoryBoardProps {
	categories: CategoryGroup[];
	data: Account[];
	grapping?: GrappingData<Account> | null;
	grappingPos?: Vec2 | null;
	onGrap?: (data: Account) => (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onDropToUpdate?: (categoryId: number | null, categoryTitle: string) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onDrop?: () => void;
	onDragging?: (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onClick?: (account: Account) => h.JSX.MouseEventHandler<HTMLDivElement>;
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
		return { ...group, categories: group.categories.map(category => {
			return {
				...category,
				accounts: alignedData[category.id],
			}
		})}
	});
}


const CategoryBoard: FunctionalComponent<CategoryBoardProps> = ({ categories, data, grapping, grappingPos, onGrap, onDropToUpdate, onDrop, onDragging, onClick }) => {

	const alignedData = getDataAligned(data);
	const categoriesWithData = combineCategoriesWithData(categories, alignedData);

	return (
		<div class='category-board' onMouseMove={onDragging} onMouseUp={onDrop}>
			<div class='gap-medium'>
				<div class='gap-tiny'>
					<Divider text='미분류'  />
					<BoardItem
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
				{ categoriesWithData.map(group => (
					<div key={group.id} class='gap-tiny'>
						<Divider text={group.title || '카테고리 그룹 없음'}  />
						<div class='category-board-row'>
							{ group.categories && group.categories.map(category => (
								<BoardItem
									class='board-item-col-4'
									title={category.title}
									isGrapping={!!grapping}
									onDropToUpdate={onDropToUpdate && onDropToUpdate( category.id, category.title )}
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
