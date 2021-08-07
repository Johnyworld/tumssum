import { h, FunctionalComponent } from 'preact';
import { Account, BankGroup, CategoryGroup } from 'types';
import AccountListItem from './AccountListItem';
import './AccountList.scss';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

export interface AccountListProps {
	list: Account[];
	categoriesCombined: CategoryGroup[];
	banksCombined: BankGroup[];
	onChange: (account: Account) => void;
}

const AccountList: FunctionalComponent<AccountListProps> = ({ list, categoriesCombined, banksCombined, onChange }) => {

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
		if (key === 'category') onChange({ id, category: +e.currentTarget.value } as Account);
		else if (key === 'bank') onChange({ id, bank: +e.currentTarget.value } as Account);
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
				<th style={{ top }}>번호</th>
				<th style={{ top }}>날짜</th>
				<th style={{ top }}>시간</th>
				<th style={{ top }} class='t-left'>제목</th>
				<th style={{ top }} class='t-right'>금액</th>
				<th style={{ top }}>카테고리</th>
				<th style={{ top }}>뱅크</th>
			</tr>
		</thead>
	)
}

export default AccountList;
