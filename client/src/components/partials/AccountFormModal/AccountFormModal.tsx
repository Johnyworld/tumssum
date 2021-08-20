import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import { useCallback, useState } from 'preact/hooks';
import { Account, BankGroup, CategoryGroup } from 'types';
import Button from '~components/atoms/Button';
import ContentEditable from '~components/atoms/ContentEditable';
import DatePicker from '~components/atoms/DatePicker';
import Dropdown from '~components/atoms/Dropdown';
import TimePicker from '~components/atoms/TimePicker';
import LabeledContentEditable from '~components/items/LabeledContentEditable';
import Modal from '~components/layouts/Modal';
import useContentEditable from '~hooks/useContentEditable';
import useInput from '~hooks/useInput';
import { getLocalString } from '~utils/calendar';

export interface AccountFormModalProps {
	initialValues?: Account | null;
	categoriesCombined: CategoryGroup[];
	banksCombined: BankGroup[];
	onConfirm: (account: Account) => void;
	onDelete?: (id: number) => h.JSX.MouseEventHandler<HTMLParagraphElement>;
}

const AccountFormModal: FunctionalComponent<AccountFormModalProps> = ({ initialValues, categoriesCombined, banksCombined, onConfirm, onDelete }) => {

	const { t } = useTranslation();
	
	const [ title, changeTitle ] = useContentEditable(initialValues?.title || '');
	const [amount, ___, setAmmount] = useInput(initialValues?.account ? Math.abs(initialValues.account)+'' : '');
	const [isIncome, setIsIncome] = useState(initialValues?.account ? !(initialValues.account < 0) : false);
	const [date, _, setDate] = useInput(initialValues?.datetime || getLocalString());
	const [time, __, setTime] = useInput(initialValues?.datetime?.split('T')[1]?.substr(0,5) || '');
	const [ memo, changeMemo ] = useContentEditable(initialValues?.memo || '');
	const [ category, setCategory ] = useState<number|string>(initialValues?.category || '');
	const [ bank, setBank ] = useState<number|string>(initialValues?.bank || '');


	const handleChangeCategory: h.JSX.GenericEventHandler<HTMLSelectElement> = useCallback((e) => {
		setCategory(e.currentTarget.value);
	}, [category])

	const handleChangeBank: h.JSX.GenericEventHandler<HTMLSelectElement> = useCallback((e) => {
		setBank(e.currentTarget.value);
	}, [category])


	const handleChangeIsIncome = (value: boolean) => {
		setIsIncome(!value);
	}
	

	const handleSubmit: h.JSX.GenericEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const theDate = date.split('T')[0];
		const theTime = time ? 'T' + time : '';
		const then = new Date(theDate + theTime);
		const datetime = time ? then.toISOString() : then.toISOString().substr(0, 10);
		onConfirm({
			id: initialValues?.id,
			title,
			account: isIncome ? +amount : -amount,
			datetime,
			memo,
			category: +category || null,
			bank: +bank || null,
		} as Account);
	}

	return (
		<Modal.Container>
			<form onSubmit={handleSubmit}>
				<Modal.Content padding class='gap-regular'>
					<ContentEditable
						value={title}
						size='large'
						styleType='transparent'
						weight='bold'
						isOneLine
						placeholder='제목을 입력하세요.'
						onChange={changeTitle}
					/>
					<div class='gap-tiny'>
						<LabeledContentEditable
							value={amount}
							type='number'
							label='금액'
							color={isIncome ? 'pen' : 'red'}
							weight='bold'
							placeholder='비어있음'
							isNumberNegative={!isIncome}
							onChange={setAmmount}
							onChangeNumberNegative={handleChangeIsIncome}
						/>
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
							label='카테고리'
							placeholder='미분류'
							selected={category}
							onChange={handleChangeCategory}
						/>
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
							label='뱅크'
							placeholder='미분류'
							selected={bank}
							onChange={handleChangeBank}
						/>
						<DatePicker fluid label='날짜' date={date} onChange={(date) => setDate(date)} placeholder='비어있음' />
						<TimePicker fluid label='시간' time={time} onChange={(date) => setTime(date)} placeholder='비어있음' />
						<LabeledContentEditable
							value={memo}
							label='메모'
							placeholder='비어있음'
							onChange={changeMemo}
						/>
					</div>
				</Modal.Content>
				<Modal.Footer flex padding>
					{ onDelete && initialValues ? <p class='c-red f-bold pointer' onClick={onDelete(initialValues.id)}>삭제</p> : <p /> }
					<Button type='submit' children={t('common_save')} />
				</Modal.Footer>
			</form>
		</Modal.Container>
	)
}

export default AccountFormModal;
