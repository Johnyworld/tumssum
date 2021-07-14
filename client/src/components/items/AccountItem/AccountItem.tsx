import { h, FunctionalComponent } from 'preact';
import { DefaultProps } from 'types';
import Card from '~components/elements/Card';
import { getClassNames } from '~utils/classNames';
import { getNumberWithComma } from '~utils/number';

export interface AccountItemProps extends DefaultProps {
	title: string;
	amount: number;
	onClick?: h.JSX.MouseEventHandler<HTMLDivElement>;
	onMouseDown?: h.JSX.MouseEventHandler<HTMLDivElement>;
}

const AccountItem: FunctionalComponent<AccountItemProps> = ({ style, class: className, title, amount, onClick, onMouseDown }) => {
	return (
		<Card padding='tiny' style={style} class={getClassNames([ 'account-item', className ])} onClick={onClick} onMouseDown={onMouseDown} >
			<p class='f-small f-bold'>{title}</p>
			<p class={getClassNames([ 'f-small', 't-right', amount < 0 ? 'c-red' : 'c-pencel' ])}>{getNumberWithComma(amount || 0)}</p>
		</Card>
	)
}

export default AccountItem;
