import { h, FunctionalComponent } from 'preact';
import { Account, CategoryGroup, Vec2 } from 'types';
import BoardItem from '~components/atoms/BoardItem';
import { grabbingData } from '~hooks/useDrag';
import AccountItem from '../AccountItem';
import './CategoryBoard.scss';

interface CategoryBoardProps {
	categoriesCombined: CategoryGroup[];
	data: Account[];
	grabbing?: grabbingData<Account> | null;
	grabbingPos?: Vec2 | null;
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

export const getAccountsByCategories = (accounts: Account[], categoriesCombined: CategoryGroup[]) => {
	const alignedData = getDataAligned(accounts);
	const accountsByCategories = combineCategoriesWithData(categoriesCombined, alignedData);
	return {
		noCategory: alignedData.EMPTY,
		accountsByCategories
	}
}


const CategoryBoard: FunctionalComponent<CategoryBoardProps> = ({ categoriesCombined, data, grabbing, grabbingPos, onGrap, onDropToUpdate, onDrop, onDragging, onClick, onClickPlus }) => {

	const { noCategory, accountsByCategories } = getAccountsByCategories(data, categoriesCombined);

	return (
		<div class='category-board' onMouseMove={onDragging} onMouseUp={onDrop}>
			<div class='gap-mv-medium'>
				<div>
					<p class='category-board__group-title c-gray f-small f-bold'>미분류</p>
					<div class='category-board__row'>
						<BoardItem
							title='미분류'
							isgrabbing={!!grabbing}
							onDropToUpdate={onDropToUpdate && onDropToUpdate( null, '' )}
							children={
								<div class='grid grid-col-4 gap-tiny' style={{ flexWrap: 'wrap' }}>
									{ noCategory && noCategory.map(account => (
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
				{ accountsByCategories.map(group => (
					<div key={group.id} >
						<p class='category-board__group-title'>{group.title || (group.title === '' ? '이름 없음' : '그룹 없는 카테고리')}</p>
						<div class='category-board__row'>
							{ group.items && group.items.map(category => (
								<BoardItem
									class='board-item--col-4'
									title={category.title}
									isgrabbing={!!grabbing}
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
							{ group.items.length%4 !== 0 &&
								<div />
							}
						</div>
					</div>
				))}
			</div>

			{ grabbing && grabbingPos &&
				<AccountItem
					title={grabbing.data.title}
					amount={grabbing.data.account}
					class='calendar__grabbing'
					style={{ left: grabbingPos.x, top: grabbingPos.y, width: grabbing.width, height: grabbing.height }} 
				/>
			}
		</div>
	)
}

export default CategoryBoard;
