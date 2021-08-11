import { h, FunctionalComponent } from 'preact';
import AccordionTable from '~components/items/AccordionTable';
import './Balances.scss';

export interface BalancesProps {

}

const Balances: FunctionalComponent<BalancesProps> = ({  }) => {
	return (
		<div class='balances card'>
			<h3 class='p-small'>잔고</h3>
			<AccordionTable.Head head={['뱅크', null, '소비']} />
		</div>
	)
}

export default Balances;
