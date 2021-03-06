import { h, FunctionalComponent } from 'preact';
import { DefaultProps, SelectMenuItem } from 'types';
import { c } from '~utils/classNames';
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
		<div class={c('selector', 'input-container', className, [fluid, 'fluid'] )}>
			{ label && <label class='input-label'>{label}</label> }
			<ul class='flex'>
				{ list.map(item=> (
					<li class={c('selector-item', 'input-box', [item.id === selected, '&--selected'] )} onClick={onChange ? onChange(item.id) : undefined}> 
						{item.text}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Selector;
