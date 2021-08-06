import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Bank, BankGroup, Category, CategoryGroup, Vec2 } from 'types';
import ContentEditable from '~components/elements/ContentEditable';
import Divider from '~components/elements/Divider';
import Icon from '~components/elements/Icon';
import { GrappingData } from '~hooks/useDrag';
import { getClassNames } from '~utils/classNames';
import './ManagementList.scss';

type ItemGroup = CategoryGroup | BankGroup;
type Item = Category | Bank;

export interface ManagementListProps {
	data: ItemGroup[];
	grapping: GrappingData<Item> | null;
	grappingPos: Vec2 | null;
	focusGroup: number | null;
	focusItem: number | null;
	isDragging: boolean | null;
	onGrap: (data: Item) => (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onDropToUpdate: (groupId: number | null) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onDrop: () => void;
	onDragging: (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onUpdate: (data: Item) => void;
	onClick: (data: Item) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onClickGroup: (data: ItemGroup) => h.JSX.MouseEventHandler<HTMLDivElement>;
}

const ManagementList: FunctionalComponent<ManagementListProps> = ({ data, grapping, grappingPos, focusGroup, focusItem, isDragging, onGrap, onDropToUpdate, onDrop, onDragging, onUpdate, onClick, onClickGroup }) => {
	return (
		<div class='management-list gap-large pos-relative never-drag' onMouseMove={onDragging} onMouseUp={onDrop} >
			<div class='gap-regular'>
				{ data.map(group => {
					const [ hover, setHover ] = useState(false);
					const handleHover = () => setHover(true);
					const handleHoverOut = () => setHover(false);
					return (
						<div key={group.id} class='pos-relative' onMouseEnter={handleHover} onMouseLeave={handleHoverOut} onMouseUp={onDropToUpdate(group.id || null)}>
							{!!grapping && hover && <div class='board-item-grapping' style={{ transform: 'scaleX(1.02)', borderRadius: '.25rem' }} />}
							{ group.id
								? <div class='management-list-group pos-relative'>
										<ContentEditable
											value={group.title}
											color='gray'
											weight='bold'
											styleType='transparent'
											onChange={() => {}}
											isFocusOnLoad={focusGroup === group.id}
											placeholder='이름 없음'
										/>
										<div class='management-list-icon pos-center-y pointer' onClick={onClickGroup(group)}>
											<Icon as='pencel' color='gray_strong' />
										</div>
									</div>
								: <p class='management-list-group c-gray f-bold' >{group.title || '그룹 미분류'}</p>
							}
							<Divider />
							<div class='gap-tiny'>
								{ group.items && group.items.length > 0 ? group.items.map(item=> (
									<div class='management-list-item pos-relative' onMouseDown={onGrap(item)}>
										{ isDragging
											? <div class={getClassNames([ 'content-box', [!item.title, 'c-gray'] ])}>{item.title || '비어있음'}</div>
											: <ContentEditable
													onChange={(value) => value !== item.title && onUpdate({ id: item.id, title: value } as Category | Bank)}
													style={!!grapping && { background: 'none' }}
													class='fluid'
													placeholder='이름 없음'
													isChangeOnBlur
													isFocusOnLoad={focusItem === item.id}
													value={item.title}
												/>
										}
										<div class='management-list-icon pos-center-y pointer' onClick={onClick(item)}>
											<Icon as='pencel' color='gray_strong' />
										</div>
									</div>
								)) : <p class='management-list-item p-small c-gray'>카테고리 없음</p>}
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
