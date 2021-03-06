import { h, FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';
import { Account, Bank, CategoryGroup } from 'types';
import BoardItem from '~components/atoms/BoardItem';
import { grabbingData } from '~hooks/useDrag';
import AccountItem from '../AccountItem';
import './CategoryBoard.scss';

export interface CategoryBoardProps {
	categoriesCombined: CategoryGroup[];
	data: Account[];
	grabbing?: grabbingData<Account> | null;
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


const CategoryBoard: FunctionalComponent<CategoryBoardProps> = ({ categoriesCombined, data, grabbing, onGrap, onDropToUpdate, onDrop, onDragging, onClick, onClickPlus }) => {

	const { noCategory, accountsByCategories } = getAccountsByCategories(data, categoriesCombined);

	return (
		<div class='category-board' onMouseMove={onDragging} onMouseUp={onDrop}>
			<div class='gap-mv-medium'>
				<div>
					<p class='category-board__group-title c-gray f-small f-bold'>?????????</p>
					<div class='category-board__row'>
						<BoardItem
							title='?????????'
							isGrabbing={!!grabbing}
							onDropToUpdate={onDropToUpdate && onDropToUpdate( null, '' )}
							children={
								<div class='grid grid-col-4 gap-tiny' style={{ flexWrap: 'wrap' }}>
									{ noCategory && noCategory.map(account => (
										<AccountItem
											data={account}
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
						<p class='category-board__group-title'>{group.title || (group.title === '' ? '?????? ??????' : '?????? ?????? ????????????')}</p>
						<div class='category-board__row'>
							{ group.items && group.items.map(category => (
								<BoardItem
									class='board-item--col-4'
									title={category.title}
									isGrabbing={!!grabbing}
									onDropToUpdate={onDropToUpdate && onDropToUpdate( category.id, category.title )}
									onClickPlus={onClickPlus && onClickPlus(category.id)}
									children={category.accounts && category.accounts.map(account => (
										<AccountItem
											data={account}
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
		</div>
	)
}

export default memo(CategoryBoard);
