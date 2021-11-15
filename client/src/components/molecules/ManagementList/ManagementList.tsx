import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { Vec2 } from 'types';
import Card from '~components/atoms/Card';
import Icon from '~components/atoms/Icon';
import { grabbingData } from '~hooks/useDrag';
import numberUtils from '~utils/numberUtils';
import './ManagementList.scss';

export interface ItemGroup<T> {
	id: number;
	title: string;
	user: number;
	items: T[];
	budget?: number;
};

export interface Item {
	id: number;
	title: string;
	memo?: string;
	budget?: number;
	group: number | null;
}

export interface ManagementListProps<T, S> {
	data: S[];
	grabbing: grabbingData<T> | null;
	grabbingPos: Vec2 | null;
	onGrap: (data: T) => (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onDropToUpdate: (groupId: number | null) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onDrop: () => void;
	onDragging: (e: h.JSX.TargetedMouseEvent<HTMLDivElement>) => void;
	onClick: (data: T) => h.JSX.MouseEventHandler<HTMLDivElement>;
	onClickGroup: (data: S) => h.JSX.MouseEventHandler<HTMLDivElement>;
}

const ManagementList = <T extends Item, S extends ItemGroup<T>>({ data, grabbing, grabbingPos, onGrap, onDropToUpdate, onDrop, onDragging, onClick, onClickGroup }: ManagementListProps<T, S>) => {

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
							{!!grabbing && hover && <div class='board-item__grabbing' />}
							{ group.id
								? <div class='management-list__group pos-relative'>
										<p>{group.title || T.NO_NAME}</p>
										<Icon class='management-list__icon' as='pencel' color='gray_strong' onClick={onClickGroup(group)} />
									</div>
								: <p class='management-list__group c-gray f-bold' >{group.title || T.NO_GROUP}</p>
							}
							<div class='management-list__items gap-mv-small'>
								{ group.items && group.items.length > 0 ? group.items.map(item=> (
									<Card class='management-list__item' padding='small' onClick={onClick(item)} onMouseDown={onGrap(item)} >
										<p class={`${item.title ? 'f-bold' : 'c-gray f-italic'}`}>{item.title || T.NO_NAME}</p>
										{item.memo && <p class={'c-pencel ellipsis'}>{item.memo}</p> }
										{item.budget && <p class={'c-primary'}>예산: {numberUtils.getNumberWithComma(item.budget)}</p>}
									</Card>
								)) : <p class='management-list__empty'>{T.EMPTY}</p>}
							</div>
						</div>
					)
				})}
			</div>

			{ grabbing && grabbingPos &&
				<Card
					class='calendar-grabbing content-box'
					style={{ left: grabbingPos.x, top: grabbingPos.y - grabbing.height, width: grabbing.width, height: grabbing.height, backgroundColor: 'var(--color-dark_weakest)' }} 
					children={grabbing.data.title}
				/>
			}
		</div>
	)
}

export default ManagementList;
