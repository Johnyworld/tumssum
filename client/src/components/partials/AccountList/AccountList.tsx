import { h, FunctionalComponent } from 'preact';
import { Account, BankGroup, CategoryGroup } from 'types';
import AccountListItem from './AccountListItem';
import './AccountList.scss';

export interface AccountListProps {
	list: Account[];
	categoriesCombined: CategoryGroup[];
	banksCombined: BankGroup[];
	onChange: (account: Account) => void;
}

const AccountList: FunctionalComponent<AccountListProps> = ({ list, categoriesCombined, banksCombined, onChange }) => {

	const handleChangeTitle = (id: number) => (title: string) => {
		onChange({ id, title } as Account);
	}

	const handleChangeDatetime = (id: number, datetime: string) => {
		onChange({ id, datetime } as Account);
	}

	const handleChangeAmount = (id: number, isIncome: boolean) => (value: string) => {
		onChange({ id, account: isIncome ? +value : -value } as Account)
	}

	const handleChangeDropdown: (id: number, key: string) => h.JSX.GenericEventHandler<HTMLSelectElement> = (id, key) => (e) => {
		if (key === 'category') onChange({ id, category: +e.currentTarget.value } as Account);
		else if (key === 'bank') onChange({ id, bank: +e.currentTarget.value } as Account);
	}

	return (
		<div class='account-list'>
			<table>
				<thead>
					<tr>
						<th class='t-left'>번호</th>
						<th>날짜</th>
						<th>시간</th>
						<th class='t-left'>제목</th>
						<th class='t-right'>금액</th>
						<th class='t-left'>카테고리</th>
						<th class='t-left'>뱅크</th>
					</tr>
				</thead>
				<tbody>
					{ list.map((item, i) => (
						<AccountListItem
							index={i}
							key={item.id}
							item={item}
							categoriesCombined={categoriesCombined}
							banksCombined={banksCombined}
							onChangeTitle={handleChangeTitle}
							onChangeDatetime={handleChangeDatetime}
							onChangeAmount={handleChangeAmount}
							onChangeDropdown={handleChangeDropdown}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default AccountList;
