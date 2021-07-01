import { h, FunctionalComponent } from 'preact';
import { DefaultProps } from 'types';
import { getClassNames } from '~utils/classNames';
import './Aside.scss';

interface Props extends DefaultProps {
	wide?: boolean;	
	alignRight?: boolean;
}

const Aside: FunctionalComponent<Props> = ({ children, class: className, wide, alignRight }) => {
	return (
		<aside class={getClassNames(['aside', className, [wide, 'aside-wide'], [alignRight, 'aside-right']])}>
			{children}
		</aside>
	)
}

export default Aside;
