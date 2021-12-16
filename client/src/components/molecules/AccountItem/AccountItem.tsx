import { h, FunctionalComponent } from 'preact';
import { Account, Bank, DefaultProps } from 'types';
import Card from '~components/atoms/Card';
import { c } from '~utils/classNames';
import numberUtils from '~utils/numberUtils';
import './AccountItem.scss';

export interface AccountItemProps extends DefaultProps {
	data: Account;
	banks?: Bank[];
	onClick?: h.JSX.MouseEventHandler<HTMLDivElement>;
	onMouseDown?: h.JSX.MouseEventHandler<HTMLDivElement>;
}

const AccountItem: FunctionalComponent<AccountItemProps> = ({ style, class: className, data, banks, onClick, onMouseDown }) => {

	const { title, to, account, bank_title } = data;

	const _title = to ? (bank_title || '📤') + ' ➡ ' + (banks && banks.find(bank => bank.id === to)?.title || '📥') : title || '제목없음';

	return (
		<Card padding='tiny' style={style} class={c( 'account-item', className, [!!to, '&--transparent'] )} onClick={onClick} onMouseDown={onMouseDown} >
			<p class={c('f-small f-bold ellipsis', [to, 'c-gray_strong'])}>{_title}</p>
			<p class={c( 'f-small', 't-right', to ? 'c-pencel' : account < 0 ? 'c-red' : 'c-blue' )}>{numberUtils.getNumberWithComma(account || 0)}</p>
		</Card>
	)
}

export default AccountItem;
