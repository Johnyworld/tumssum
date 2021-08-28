import { h, FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';
import { useState } from 'preact/hooks';
import { Account, BankGroup, CategoryGroup } from 'types';
import ContentEditable from '~components/atoms/ContentEditable';
import DatePicker from '~components/atoms/DatePicker';
import Dropdown from '~components/atoms/Dropdown';
import TimePicker from '~components/atoms/TimePicker';
import LabeledContentEditable from '~components/molecules/LabeledContentEditable';

export interface AccountListItemProps {
	index: number;
	item: Account;
	categoriesCombined: CategoryGroup[];
	banksCombined: BankGroup[];
	onChangeTitle: (id: number) => (value: string) => void;
	onChangeDatetime: (id: number, value: string) => void;
	onChangeAmount: (id: number, isIncome: boolean) => (value: string) => void;
	onChangeDropdown: (id: number, key: string) => h.JSX.GenericEventHandler<HTMLSelectElement>;
}

const AccountListItem: FunctionalComponent<AccountListItemProps> = ({ index, item, categoriesCombined, banksCombined, onChangeTitle, onChangeDatetime, onChangeAmount, onChangeDropdown }) => {

	const { id, title, datetime, category, bank } = item;
	const [isIncome, setIsIncome] = useState(item.account ? !(item.account < 0) : false);

	const handleChangeIsIncome = (value: boolean) => {
		setIsIncome(!value);
	}

	const handleChangeDate = (key: string) => (value: string) => {
		const theDate = key === 'date' ? value.split('T')[0] : datetime.split('T')[0];
		const theTime = key === 'time' ? value : datetime.split('T')[1];
		const then = new Date(theDate + (theTime ? 'T' + theTime : ''));
		const results = theTime ? then.toISOString() : then.toISOString().substr(0, 10);
		onChangeDatetime(id, results)
	}

	return (
		<tr>
			<td>{index + 1}</td>
			<td>
				<DatePicker isHideIcon date={item.datetime} onChange={handleChangeDate('date')} placeholder='비어있음' />
			</td>
			<td>
				<TimePicker isHideIcon time={item.datetime?.split('T')[1]?.substr(0,5)} onChange={handleChangeDate('time')} placeholder='비어있음' />
			</td>
			<td class='t-left'>
				<ContentEditable
					value={title || ''}
					isOneLine
					placeholder='제목을 입력하세요.'
					isChangeOnBlur
					onChange={onChangeTitle(id)}
				/>
			</td>
			<td class='t-right'>
				<LabeledContentEditable
					value={item.account ? Math.abs(item.account)+'' : ''}
					type='number'
					color={isIncome ? 'pen' : 'red'}
					weight='bold'
					placeholder='비어있음'
					isNumberNegative={!isIncome}
					isChangeOnBlur
					isHideIcon
					onChange={onChangeAmount(id, isIncome)}
					onChangeNumberNegative={handleChangeIsIncome}
				/>
			</td>
			<td>
				<Dropdown
					list={[
						...categoriesCombined.map(group => { return {
							id: group.id,
							text: group.title || '이름 없음',
							children: group.items.map(category => { return {
								id: category.id,
								text: category.title,
							}})
						}}),
					]}
					placeholder='미분류'
					selected={category}
					onChange={onChangeDropdown(id, 'category')}
				/>
			</td>
			<td>
				<Dropdown
					list={[
						...banksCombined.map(group => { return {
							id: group.id,
							text: group.title || '이름 없음',
							children: group.items.map(bank => { return {
								id: bank.id,
								text: bank.title,
							}})
						}}),
					]}
					placeholder='미분류'
					selected={bank}
					onChange={onChangeDropdown(id, 'bank')}
				/>
			</td>
		</tr>
	)
}

export default memo(AccountListItem);