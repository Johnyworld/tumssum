import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { Vec2 } from 'types';
import Card from '~components/atoms/Card';
import Icon from '~components/atoms/Icon';
import { GrappingData } from '~hooks/useDrag';
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
	budget?: number;
	group: number | null;
}

export interface ManagementListProps<T, S> {
	data: S[];
	grapping: GrappingData<T> | null;
	grappingPos: Vec2 | null;
	onGrap: (data: T) => (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onDropToUpdate: (groupId: number | null) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onDrop: () => void;
	onDragging: (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onClick: (data: T) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onClickGroup: (data: S) => h.JSX.MouseEventHandler<HTMLDivElement>;
}

const ManagementList = <T extends Item, S extends ItemGroup<T>>({ data, grapping, grappingPos, onGrap, onDropToUpdate, onDrop, onDragging, onClick, onClickGroup }: ManagementListProps<T, S>) => {

	const T = useMemo(() => { return {
		NO_NAME: '이름 없음',
		NO_GROUP: '그룹 미분류',
		EMPTY: '비어있음',
	}}, []);


	return (
		<div class='management-list pos-relative never-drag' onMouseMove={onDragging} onMouseUp={onDrop} >
			<div class='management-list__container'>
				{ data.map(group => {
					const [ hover, setHover ] = useState(false);
					const handleHover = () => setHover(true);
					const handleHoverOut = () => setHover(false);
					return (
						<div key={group.id} class='management-list__each' onMouseEnter={handleHover} onMouseLeave={handleHoverOut} onMouseUp={onDropToUpdate(group.id || null)}>
							{!!grapping && hover && <div class='board-item__grapping' />}
							{ group.id
								? <div class='management-list__group pos-relative'>
										<p>{group.title || T.NO_NAME}</p>
										<Icon class='management-list__icon' as='pencel' color='gray_strong' onClick={onClickGroup(group)} />
									</div>
								: <p class='management-list__group c-gray f-bold' >{group.title || T.NO_GROUP}</p>
							}
							<div class='management-list__items gap-small'>
								{ group.items && group.items.length > 0 ? group.items.map(item=> (
									<Card class='management-list__item' padding='small' onClick={onClick(item)} onMouseDown={onGrap(item)} >
										<p class={`${item.title ? '' : 'c-gray f-italic'}`}>{item.title || T.NO_NAME}</p>
										{item.budget && <p class={'c-gray'}>예산: {item.budget}</p>}
									</Card>
								)) : <p class='management-list__empty'>{T.EMPTY}</p>}
							</div>
						</div>
					)
				})}
			</div>

			{ grapping && grappingPos &&
				<Card
					class='calendar-grapping content-box'
					style={{ left: grappingPos.x, top: grappingPos.y - grapping.height, width: grapping.width, height: grapping.height, backgroundColor: 'var(--color-white_weakest)' }} 
					children={grapping.data.title}
				/>
			}
		</div>
	)
}

export default ManagementList;
