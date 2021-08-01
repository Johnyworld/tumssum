import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Category, CategoryGroup } from 'types';
import Button from '~components/elements/Button';
import ContentEditable from '~components/elements/ContentEditable';
import Divider from '~components/elements/Divider';
import PageContainer from '~components/layouts/PageComtainet';
import useCategory from '~hooks/useCategory';
import useDrag from '~hooks/useDrag';
import { useSelector } from '~utils/redux/hooks';


export const getCategoryGroups = (groups: CategoryGroup[]) => {
	return groups.reduce((prev, curr) => {
		curr.categories = [];
		if (!curr.id) return prev;
		return [...prev, curr];
	}, [] as CategoryGroup[]);
}

export const getCategories = (categories: CategoryGroup[]) => {
	return categories.reduce((prev, curr) => {
		return [...prev, ...curr.categories!];
	}, [] as Category[]);
}

const getCategoriesAligned = (categories: Category[]) => {
	const results: {[x:string]: Category[]} = {}
	for ( const item of categories ) {
		const key = item.group || 'EMPTY';
		if (!results[key]) results[key] = [];
		results[key].push(item);
	}
	return results;
}


export const combineCategoriesWithGroups = (categories: Category[], categoryGroups: CategoryGroup[]) => {
	const alignedCalendar = getCategoriesAligned(categories);
	const groups: CategoryGroup[] = categoryGroups.map(group => {
		return {
			...group,
			categories: alignedCalendar[group.id] || [],
		}
	});
	return [...groups, { categories: alignedCalendar.EMPTY || [] } as CategoryGroup]
}

const CategoryPage: FunctionalComponent = ({  }) => {

	const { categories, categoryGroups } = useSelector(state=> state.category);

	const combined = combineCategoriesWithGroups(categories, categoryGroups);

	const { grapping, grappingPos, isDragging, handleGrap, handleDrop, handleDragging } = useDrag(categories);

	const { handleUpdateCategory, handleDropToUpdateCategory } = useCategory({ grapping, handleDrop });

	return (
		<PageContainer>
			<div class='wrap gap-large pos-relative never-drag' onMouseMove={handleDragging} onMouseUp={handleDrop}>
				<div style={{ height: '1rem' }} />
				<h1>카테고리 관리</h1>
				<div class='flex flex-end flex-gap-small'>
					<Button size='small' color='gray' children='+ 그룹 추가' />
					<Button size='small' children='+ 카테고리 추가' />
				</div>
				<div class='gap-regular'>
					{ combined.map(group => {
						const [ hover, setHover ] = useState(false);
						const handleHover = () => setHover(true);
						const handleHoverOut = () => setHover(false);
						return (
							<div key={group.id} class='pos-relative' onMouseEnter={handleHover} onMouseLeave={handleHoverOut} onMouseUp={handleDropToUpdateCategory(group.id)}>
								{!!grapping && hover && <div class='board-item-grapping' style={{ transform: 'scaleX(1.02)', borderRadius: '.25rem' }} />}
								{ group.title
									? <ContentEditable
											value={group.title}
											color='gray'
											weight='bold'
											styleType='transparent'
											onChange={() => {}}
											placeholder='제목 없음'
										/>
									: <p class='c-gray f-bold' >{group.title || '그룹 없음'}</p>
								}
								<Divider />
								<div class='gap-tiny'>
									{ group.categories && group.categories.length > 0 ? group.categories.map(category=> (
										<div class='list-item pos-relative' onMouseDown={handleGrap(category)}>
											{ isDragging
												? <div class='content-box'>{category.title}</div>
												: <ContentEditable
														onChange={(value) => handleUpdateCategory({ id: category.id, title: value } as Category)}
														style={!!grapping && { background: 'none' }}
														class='fluid'
														placeholder='비어있음'
														isChangeOnBlur
														value={category.title}
													/>
											}
											<div class='list-item-icon pos-center-y pointer svg-wrap'>
												<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
													<circle cx="8" cy="8.00196" r="8" fill="var(--color-gray_strong)" />
													<path d="M5 11L11 5M5 5L11 11" stroke="var(--color-paper)" stroke-linecap="round"/>
												</svg>
											</div>
										</div>
									)) : <p class='p-small c-gray'>카테고리 없음</p>}
								</div>
							</div>
						)
					})}
				</div>

				{ grapping && grappingPos &&
					<div
						class='calendar-grapping content-box'
						style={{ left: grappingPos.x, top: grappingPos.y - grapping.height, width: grapping.width, height: grapping.height, backgroundColor: 'var(--color-white_weakest)' }} 
						children={grapping.data.title}
					/>
				}
				
			</div>
		</PageContainer>
	)
}

export default CategoryPage;


