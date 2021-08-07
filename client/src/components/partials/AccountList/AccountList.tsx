import { h, FunctionalComponent } from 'preact';
import { Account } from 'types';
import './AccountList.scss';

export interface AccountListProps {
	list: Account[];
}

const AccountList: FunctionalComponent<AccountListProps> = ({ list }) => {
	return (
		<div class='account-list'>
			{ list.map(account => (
				<div>
					{account.title}
				</div>
			))}
		</div>
	)
}

export default AccountList;
