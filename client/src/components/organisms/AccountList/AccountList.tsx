import { h, FunctionalComponent } from 'preact';
import { Account, BankGroup, CategoryGroup } from 'types';
import AccountListItem from './AccountListItem';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import './AccountList.scss';

export interface AccountListProps {
	list: Account[];
	categoriesCombined: CategoryGroup[];
	banksCombined: BankGroup[];
	onChange: (account: Account) => void;
	onClickEdit: (account: Account) => h.JSX.MouseEventHandler<HTMLDivElement>;
}

const AccountList: FunctionalComponent<AccountListProps> = ({ list, categoriesCombined, banksCombined, onChange, onClickEdit }) => {

	const handleChangeTitle = useCallback((id: number) => (title: string) => {
		onChange({ id, title } as Account);
	}, []);

	const handleChangeDatetime = useCallback((id: number, datetime: string) => {
		onChange({ id, datetime } as Account);
	}, []);

	const handleChangeAmount = useCallback((id: number, isIncome: boolean) => (value: string) => {
		onChange({ id, account: isIncome ? +value : -value } as Account)
	}, []);

	const handleChangeDropdown: (id: number, key: string) => h.JSX.GenericEventHandler<HTMLSelectElement> = useCallback((id, key) => (e) => {
		if (key === 'category') onChange({ id, category: +e.currentTarget.value || null } as Account);
		else if (key === 'bank') onChange({ id, bank: +e.currentTarget.value || 0 } as Account);
	}, []);

	return (
		<div class='account-list'>
			<table>
				<Head />
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
							onClickEdit={onClickEdit}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

const Head = () => {

	const ref = useRef<HTMLTableSectionElement>(null);
	const [top, setTop] = useState(0);

	useEffect(() => {
		if (ref.current) {
			const event = () => {
				const rect = ref.current.getBoundingClientRect();
				if (rect.top < 0) {
					setTop(-rect.top);
				} else {
					setTop(0);
				}
			}
			window.addEventListener('scroll', event);
			return () => window.removeEventListener('scroll', event);
		}
	}, [ref.current]);

	return (
		<thead ref={ref} >
			<tr>
				<th style={{ top }}>??????</th>
				<th style={{ top }}>??????</th>
				<th style={{ top }}>??????</th>
				<th style={{ top }} class='t-left'>??????</th>
				<th style={{ top }} class='t-right'>??????</th>
				<th style={{ top }}>????????????</th>
				<th style={{ top }}>??????</th>
				<th style={{ top }}></th>
			</tr>
		</thead>
	)
}

export default AccountList;
