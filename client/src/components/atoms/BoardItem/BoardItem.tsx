import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { DefaultProps } from 'types';
import { c } from '~utils/classNames';
import Icon from '../Icon';
import './BoardItem.scss';

interface BoardItemProps extends DefaultProps {
	title?: string;
	disabled?: boolean;
	isGrapping?: boolean;
	onDropToUpdate?: h.JSX.MouseEventHandler<HTMLDivElement>;
	onClickPlus?: () => void;
}

const BoardItem: FunctionalComponent<BoardItemProps> = ({ children, class: className, title, disabled, isGrapping, onDropToUpdate, onClickPlus }) => {
	const [ hover, setHover ] = useState(false);
	const handleHover = () => setHover(true);
	const handleHoverOut = () => setHover(false);
	
	return (
		<div class={c('board-item never-drag gap-mv-tiny', className )} onMouseEnter={handleHover} onMouseLeave={handleHoverOut} onMouseUp={onDropToUpdate}>
			<div class='flex' style={{ flexDirection: 'row-reverse' }}>
				{ title && <p class={c( 't-right', [disabled, 'c-gray'] )}>{title}</p> }
				{onClickPlus &&
					<Icon class='board-item__plus-button' color='gray' as='plusRounded' onClick={onClickPlus} />
				}
			</div>
			{isGrapping && hover && <div class='board-item__grapping' />}
			{children}
		</div>
	)
}

export default BoardItem;
