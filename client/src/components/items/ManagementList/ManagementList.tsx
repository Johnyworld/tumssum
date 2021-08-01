import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Bank, BankGroup, Category, CategoryGroup, Vec2 } from 'types';
import ContentEditable from '~components/elements/ContentEditable';
import Divider from '~components/elements/Divider';
import { GrappingData } from '~hooks/useDrag';

type ItemGroup = CategoryGroup | BankGroup;
type Item = Category | Bank;

export interface ManagementListProps {
	data: ItemGroup[];
	grapping: GrappingData<Item> | null;
	grappingPos: Vec2 | null;
	isDragging: boolean | null;
	onGrap: (data: Item) => (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onDropToUpdate: (groupId: number | null) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onDrop: () => void;
	onDragging: (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onUpdate: (data: Item) => void;
	onClick: (data: Item) => h.JSX.MouseEventHandler<HTMLDivElement>;
}

const ManagementList: FunctionalComponent<ManagementListProps> = ({ data, grapping, grappingPos, isDragging, onGrap, onDropToUpdate, onDrop, onDragging, onUpdate, onClick }) => {
	return (
		<div class='gap-large pos-relative never-drag' onMouseMove={onDragging} onMouseUp={onDrop} >
			<div class='gap-regular'>
				{ data.map(group => {
					const [ hover, setHover ] = useState(false);
					const handleHover = () => setHover(true);
					const handleHoverOut = () => setHover(false);
					return (
						<div key={group.id} class='pos-relative' onMouseEnter={handleHover} onMouseLeave={handleHoverOut} onMouseUp={onDropToUpdate(group.id)}>
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
								{ group.items && group.items.length > 0 ? group.items.map(item=> (
									<div class='list-item pos-relative' onMouseDown={onGrap(item)}>
										{ isDragging
											? <div class='content-box'>{item.title}</div>
											: <ContentEditable
													onChange={(value) => onUpdate({ id: item.id, title: value } as Category | Bank)}
													style={!!grapping && { background: 'none' }}
													class='fluid'
													placeholder='비어있음'
													isChangeOnBlur
													value={item.title}
												/>
										}
										<div class='list-item-icon pos-center-y pointer svg-wrap' onClick={onClick(item)}>
											<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M3 10.5L12 1.5L15 4.5L6 13.5L2 14.5L3 10.5Z" stroke="var(--color-gray_strong)" stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M10 3.5L13 6.5" stroke="var(--color-gray_strong)" stroke-linecap="round"/>
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
	)
}

export default ManagementList;
