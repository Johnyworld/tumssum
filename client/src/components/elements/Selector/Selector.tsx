import { h, FunctionalComponent } from 'preact';
import { DefaultProps, SelectMenuItem } from 'types';
import { getClassNames } from '~utils/classNames';
import './Selector.scss';

export interface SelectorProps extends DefaultProps {
	list: SelectMenuItem[];
	selected?: string;
	label?: string;
	fluid?: boolean;
	onChange?: (id: string) => h.JSX.GenericEventHandler<HTMLLIElement>;
}

const Selector: FunctionalComponent<SelectorProps> = ({ class: className, list, selected, label, fluid, onChange }) => {
	return (
		<div class={getClassNames([ 'selector', className, [fluid, 'selector-fluid'] ])}>
			{ label && <label>{label}</label> }
			<ul class='flex'>
				{ list.map(item=> (
					<li class={getClassNames([ 'selector-item', [item.id === selected, 'selector-item-selected'] ])} onClick={onChange ? onChange(item.id) : undefined}> 
						{item.text}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Selector;
