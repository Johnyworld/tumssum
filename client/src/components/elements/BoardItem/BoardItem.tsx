import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { DefaultProps } from 'types';
import { getClassNames } from '~utils/classNames';
import './BoardItem.scss';

interface BoardItemProps extends DefaultProps {
	title: string;
	disabled?: boolean;
	isGrapping?: boolean;
	onDrop?: h.JSX.MouseEventHandler<HTMLDivElement>;
}

const BoardItem: FunctionalComponent<BoardItemProps> = ({ children, class: className, title, disabled, isGrapping, onDrop }) => {
	const [ hover, setHover ] = useState(false);
	const handleHover = () => setHover(true);
	const handleHoverOut = () => setHover(false);
	
	return (
		<div class={getClassNames(['board-item never-drag gap-tiny', className])} onMouseEnter={handleHover} onMouseLeave={handleHoverOut} onMouseUp={onDrop}>
			<p class={getClassNames([ 't-right', [disabled, 'c-gray'] ])}>{title}</p>
			{isGrapping && hover && <div class='board-item-grapping' />}
			{children}
		</div>
	)
}

export default BoardItem;
