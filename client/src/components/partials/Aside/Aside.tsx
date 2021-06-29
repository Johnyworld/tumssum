import { h, FunctionalComponent } from 'preact';
import { getClassNames } from '~utils/classNames';
import './Aside.scss';

interface Props {
	wide?: boolean;	
	alignRight?: boolean;
}

const Aside: FunctionalComponent<Props> = ({ wide, alignRight }) => {
	return (
		<div class={getClassNames(['aside', [wide, 'aside-wide'], [alignRight, 'aside-right']])}>
			Hello Aside
		</div>
	)
}

export default Aside;
