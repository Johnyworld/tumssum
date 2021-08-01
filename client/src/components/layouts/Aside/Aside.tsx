import { h, FunctionalComponent } from 'preact';
import { DefaultProps } from 'types';
import { getClassNames } from '~utils/classNames';
import './Aside.scss';

interface Props extends DefaultProps {
	alignRight?: boolean;
	mode?: 'normal' | 'icon' | 'wide';
	onHover?: (isHover: boolean) => h.JSX.MouseEventHandler<HTMLElement>;
}

const Aside: FunctionalComponent<Props> = ({ children, class: className, mode, alignRight, onHover }) => {
	return (
		<aside
			class={getClassNames(['aside', className, [mode, `aside-${mode}`], [alignRight, 'aside-right']])}
			onMouseEnter={onHover && onHover(true)}
			onMouseLeave={onHover && onHover(false)}
		>
			{children}
		</aside>
	)
}

export default Aside;
