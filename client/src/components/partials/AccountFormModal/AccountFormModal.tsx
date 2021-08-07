import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import { useState } from 'preact/hooks';
import { Account } from 'types';
import Button from '~components/elements/Button';
import ContentEditable from '~components/elements/ContentEditable';
import DatePicker from '~components/elements/DatePicker';
import TimePicker from '~components/elements/TimePicker';
import LabeledContentEditable from '~components/items/LabeledContentEditable';
import Modal from '~components/layouts/Modal';
import useContentEditable from '~hooks/useContentEditable';
import useInput from '~hooks/useInput';
import { getLocalString } from '~utils/calendar';

export interface AccountFormModalProps {
	initialValues?: Account | null;
	onConfirm: (title: string, amount: number, datetime: string, memo: string, id?: number) => void;
	onDelete?: (id: number) => h.JSX.MouseEventHandler<HTMLParagraphElement>;
}

const AccountFormModal: FunctionalComponent<AccountFormModalProps> = ({ initialValues, onConfirm, onDelete }) => {

	const { t } = useTranslation();
	
	const [ title, changeTitle ] = useContentEditable(initialValues?.title || '');
	const [amount, ___, setAmmount] = useInput(initialValues?.account ? Math.abs(initialValues.account)+'' : '');
	const [isIncome, setIsIncome] = useState(initialValues?.account ? !(initialValues.account < 0) : false);
	const [date, _, setDate] = useInput(initialValues?.datetime || getLocalString());
	const [time, __, setTime] = useInput(initialValues?.datetime?.split('T')[1]?.substr(0,5) || '');
	const [ memo, changeMemo ] = useContentEditable(initialValues?.memo || '');


	const handleChangeIsIncome = (value: boolean) => {
		setIsIncome(!value);
	}
	

	const handleSubmit: h.JSX.GenericEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const theDate = date.split('T')[0];
		const theTime = time ? 'T' + time : '';
		const then = new Date(theDate + theTime);
		const datetime = time ? then.toISOString() : then.toISOString().substr(0, 10);
		onConfirm(title, isIncome ? +amount : -amount, datetime, memo, initialValues?.id);
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
