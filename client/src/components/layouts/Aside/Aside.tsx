import { h, FunctionalComponent } from 'preact';
import { getClassNames } from '~utils/classNames';
import './Aside.scss';

interface Props {
	wide?: boolean;	
	alignRight?: boolean;
}

const Aside: FunctionalComponent<Props> = ({ children, wide, alignRight }) => {
	return (
		<aside class={getClassNames(['aside', [wide, 'aside-wide'], [alignRight, 'aside-right']])}>
			{children}
		</aside>
	)
}

export default Aside;
