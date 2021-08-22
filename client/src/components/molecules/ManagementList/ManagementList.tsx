import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { Vec2 } from 'types';
import ContentEditable from '~components/atoms/ContentEditable';
import Divider from '~components/atoms/Divider';
import Icon from '~components/atoms/Icon';
import { GrappingData } from '~hooks/useDrag';
import { getClassNames } from '~utils/classNames';
import { getNumberWithComma } from '~utils/number';
import './ManagementList.scss';

export interface ItemGroup<T> {
	id: number;
	title: string;
	user: number;
	items: T[];
};

export interface Item {
	id: number;
	title: string;
	balance?: number;
	group: number | null;
}

export interface ManagementListProps<T, S> {
	data: S[];
	grapping: GrappingData<T> | null;
	grappingPos: Vec2 | null;
	focusGroup: number | null;
	focusItem: number | null;
	isDragging: boolean | null;
	onGrap: (data: T) => (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onDropToUpdate: (groupId: number | null) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onDrop: () => void;
	onDragging: (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onUpdate: (data: T) => void;
	onUpdateGroup: (data: S) => void;
	onClick: (data: T) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onClickGroup: (data: S) => h.JSX.MouseEventHandler<HTMLDivElement>;
}

const ManagementList = <T extends Item, S extends ItemGroup<T>>({ data, grapping, grappingPos, focusGroup, focusItem, isDragging, onGrap, onDropToUpdate, onDrop, onDragging, onUpdate, onUpdateGroup, onClick, onClickGroup }: ManagementListProps<T, S>) => {

	const T = useMemo(() => { return {
		NO_NAME: '이름 없음',
		EMPTY: '비어있음',
		NO_GROUP: '그룹 미분류',
	}}, []);


	return (
		<div class='management-list gap-large pos-relative never-drag' onMouseMove={onDragging} onMouseUp={onDrop} >
			<div class='gap-regular'>
				{ data.map(group => {
					const [ hover, setHover ] = useState(false);
					const handleHover = () => setHover(true);
					const handleHoverOut = () => setHover(false);
					return (
						<div key={group.id} class='pos-relative' onMouseEnter={handleHover} onMouseLeave={handleHoverOut} onMouseUp={onDropToUpdate(group.id || null)}>
							{!!grapping && hover && <div class='board-item__grapping' style={{ transform: 'scaleX(1.02)', borderRadius: '.25rem' }} />}
							{ group.id
								? <div class='management-list__group pos-relative'>
										<ContentEditable
											value={group.title}
											color='gray'
											weight='bold'
											styleType='transparent'
											onChange={(value) => value !== group.title && onUpdateGroup({ id: group.id, title: value } as S)}
											isChangeOnBlur
											isFocusOnLoad={focusGroup === group.id}
											placeholder={T.NO_NAME}
										/>
										<div class='management-list__content' >
											<Icon class='management-list__icon' as='pencel' color='gray_strong' onClick={onClickGroup(group)} />
										</div>
									</div>
								: <p class='management-list__group c-gray f-bold' >{group.title || T.NO_GROUP}</p>
							}
							<Divider />
							<div class='gap-tiny'>
								{ group.items && group.items.length > 0 ? group.items.map(item=> (
									<div class='management-list__item pos-relative' onMouseDown={onGrap(item)}>
										{ isDragging
											? <div class={getClassNames([ 'content-box', [!item.title, 'c-gray'] ])}>{item.title || T.NO_NAME}</div>
											: <ContentEditable
													onChange={(value) => value !== item.title && onUpdate({ id: item.id, title: value } as T)}
													style={!!grapping && { background: 'none' }}
													class='fluid'
													placeholder={T.NO_NAME}
													isChangeOnBlur
													isFocusOnLoad={focusItem === item.id}
													value={item.title}
												/>
										}
										<div class='management-list__content' >
											{ item.balance && <p>{getNumberWithComma(item.balance)}</p> }
											<Icon class='management-list__icon' as='pencel' color='gray_strong' onClick={onClick(item)} />
										</div>
									</div>
								)) : <p class='management-list__item p-small c-gray'>{T.EMPTY}</p>}
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
