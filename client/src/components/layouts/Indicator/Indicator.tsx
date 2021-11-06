import { h, FunctionalComponent } from 'preact';
import { DefaultProps } from 'types';
import { c } from '~utils/classNames';
import './Indicator.scss';

export interface IndicatorProps extends DefaultProps {
	flexEnd?: boolean;
}

const Indicator: FunctionalComponent<IndicatorProps> = ({ style, class: className, children, flexEnd }) => {
	return (
		<div class={c('indicator', className, [flexEnd, 'flex-end flex-gap-small'])} style={style}>
			{children}
		</div>
	)
}

export default Indicator;
