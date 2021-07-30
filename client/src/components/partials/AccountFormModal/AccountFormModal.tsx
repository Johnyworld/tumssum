import { h, FunctionalComponent } from 'preact';
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
	initialValues?: Account;
	onConfirm: (title: string, amount: number, datetime: string, memo: string, id?: number) => void;
	onClose: () => void;
	onGoBack?: () => void;
}

const AccountFormModal: FunctionalComponent<AccountFormModalProps> = ({ initialValues, onClose, onConfirm, onGoBack }) => {

	
	// const [title, handleChangeTitle] = useInput(initialValues?.title || '');
	const [amount, handleChangeAmount] = useInput(initialValues?.account ? Math.abs(initialValues.account)+'' : '');
	const [isIncome, setIsIncome] = useState(initialValues?.account ? !(initialValues.account < 0) : false);
	const [date, _, setDate] = useInput(initialValues?.datetime || getLocalString());
	const [time, __, setTime] = useInput(initialValues?.datetime.split('T')[1]?.substr(0,5) || '');

	const [ title, changeTitle ] = useContentEditable(initialValues?.title || '');
	const [ memo, changeMemo ] = useContentEditable(initialValues?.memo || '');

	const handleChangeIsIncome = (id: string) => () => {
		if (id === 'income') setIsIncome(true);
		else setIsIncome(false);
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
				{/* <Modal.Header children={!initialValues ? '새 기록 추가하기' : '뒤로가기'} onGoBack={onGoBack} />
				<Modal.XButton onClose={onClose} /> */}
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
						<DatePicker fluid label='날짜' date={date} onChange={(date) => setDate(date)} placeholder='비어있음' />
						<TimePicker fluid label='시간' time={time} onChange={(date) => setTime(date)} placeholder='비어있음' />
						<LabeledContentEditable
							value={memo}
							label='메모'
							placeholder='비어있음'
							onChange={changeMemo}
						/>
					</div>
					{/* <Selector
						fluid
						label='지출/수입'
						selected={isIncome ? 'income' : 'expenditure'}
						onChange={handleChangeIsIncome}
						list={[
							{ id: 'expenditure', text: '지출' },
							{ id: 'income', text: '수입' },
						]}
					/>
					<Input fluid required name='title' label='제목' maxLength={TITLE_MAX_LENGTH} placeholder='무엇을 지출/수입 하셨나요?' value={title} onChange={(e) => changeTitle(e.currentTarget.value)} />
					<Input fluid required name='amount' label='금액' min={0} max={ACCOUNT_MAX} placeholder='금액을 입력하세요.' value={amount} onChange={handleChangeAmount} type='number' removeAutoComplete />
					<div class='grid grid-col-2 grid-gap-regular'>
						<DatePicker fluid styleType='input' label='날짜' date={date} onChange={(date) => setDate(date)} placeholder='비어있음' />
						<TimePicker fluid styleType='input' label='시간' time={time} onChange={(date) => setTime(date)} placeholder='비어있음' />
					</div>
					<div style={{ height: '30px' }} /> */}
				</Modal.Content>
				<Modal.Footer flexEnd padding>
					<Button type='submit' children='확인' />
				</Modal.Footer>
				{/* <Modal.Footer>
					<Button border='squared' fluid size='large' type='submit' children='확인' />
				</Modal.Footer> */}
			</form>
		</Modal.Container>
	)
}

export default AccountFormModal;
