import { h, FunctionalComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Account } from 'types';
import Button from '~components/elements/Button';
import DatePicker from '~components/elements/DatePicker';
import Input from '~components/elements/Input';
import Selector from '~components/elements/Selector/Selector';
import TimePicker from '~components/elements/TimePicker';
import Modal from '~components/layouts/Modal';
import useInput from '~hooks/useInput';
import { getLocalString } from '~utils/calendar';

export interface AccountFormModalProps {
	initialValues?: Account;
	onConfirm: (title: string, amount: number, datetime: string, id?: number) => void;
	onClose: () => void;
	onGoBack?: () => void;
}

const AccountFormModal: FunctionalComponent<AccountFormModalProps> = ({ initialValues, onClose, onConfirm, onGoBack }) => {

	const inputRef = useRef<HTMLInputElement>(null);
	
	const [title, handleChangeTitle] = useInput(initialValues?.title || '');
	const [amount, handleChangeAmount] = useInput(initialValues?.account ? Math.abs(initialValues.account)+'' : '');
	const [isIncome, setIsIncome] = useState(initialValues?.account ? !(initialValues.account < 0) : false);
	const [date, _, setDate] = useInput(initialValues?.datetime || getLocalString());
	const [time, __, setTime] = useInput(initialValues?.datetime.split('T')[1]?.substr(0,5) || '');


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
		onConfirm(title, isIncome ? +amount : -amount, datetime, initialValues?.id);
	}


	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [inputRef.current]);


	return (
		<Modal.Container>
			<form onSubmit={handleSubmit}>
				<Modal.Header children={!initialValues ? '새 기록 추가하기' : '뒤로가기'} onGoBack={onGoBack} />
				<Modal.XButton onClose={onClose} />
				<Modal.Content padding class='gap-regular'>
					<Selector
						fluid
						label='지출/수입'
						selected={isIncome ? 'income' : 'expenditure'}
						onChange={handleChangeIsIncome}
						list={[
							{ id: 'expenditure', text: '지출' },
							{ id: 'income', text: '수입' },
						]}
					/>
					<Input fluid required name='title' label='제목' placeholder='무엇을 지출/수입 하셨나요?' value={title} onChange={handleChangeTitle} inputRef={inputRef} />
					<Input fluid required name='amount' label='금액' placeholder='금액을 입력하세요.' value={amount} onChange={handleChangeAmount} type='number' min={0} removeAutoComplete />
					<div class='grid grid-col-2 grid-gap-regular'>
						<DatePicker fluid label='날짜' date={date} onChange={(date) => setDate(date)} />
						<TimePicker fluid label='시간' time={time} onChange={(date) => setTime(date)} />
					</div>
					<div style={{ height: '30px' }} />
				</Modal.Content>
				<Modal.Footer>
					<Button border='squared' fluid size='large' type='submit' children='확인' />
				</Modal.Footer>
			</form>
		</Modal.Container>
	)
}

export default AccountFormModal;
