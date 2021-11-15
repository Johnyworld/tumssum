import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { DefaultProps } from 'types';
import { c } from '~utils/classNames';
import Icon from '../Icon';
import './BoardItem.scss';

interface BoardItemProps extends DefaultProps {
	title?: string;
	disabled?: boolean;
	isGrabbing?: boolean;
	isFocused?: boolean;
	onDropToUpdate?: h.JSX.MouseEventHandler<HTMLDivElement>;
	onClickPlus?: () => void;
}

const BoardItem: FunctionalComponent<BoardItemProps> = ({ children, class: className, title, disabled, isGrabbing, isFocused, onDropToUpdate, onClickPlus }) => {
	const [ hover, setHover ] = useState(false);
	const handleHover = () => setHover(true);
	const handleHoverOut = () => setHover(false);
	
	return (
		<div class={c('board-item', 'never-drag', className )} onMouseEnter={handleHover} onMouseLeave={handleHoverOut} onMouseUp={onDropToUpdate}>
			<div class='board-item__header' style={{ flexDirection: 'row-reverse' }}>
				<p class={c('board-item__title', 't-right', [disabled, 'c-gray'], [!title, '&--no-name'], [isFocused!==undefined, '&--focusable'], [isFocused, '&--focused'] )}>{title || '이름 없음'}</p>
				{onClickPlus &&
					<Icon class='board-item__plus-button' color='gray' as='plusRounded' onClick={onClickPlus} />
				}
			</div>
			{isGrabbing && hover && <div class='board-item__grabbing' />}
			<div class='board-item__body'>
				{children}
			</div>
		</div>
	)
}

export default BoardItem;
