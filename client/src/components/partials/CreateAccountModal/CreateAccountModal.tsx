import { h, FunctionalComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import Button from '~components/elements/Button';
import DatePicker from '~components/elements/DatePicker';
import Input from '~components/elements/Input';
import Selector from '~components/elements/Selector/Selector';
import TimePicker from '~components/elements/TimePicker';
import Modal from '~components/layouts/Modal';
import useInput from '~hooks/useInput';

interface CreateAccountModalProps {
	isOpen: boolean;
	onCreateAccount: (title: string, isIncome: boolean, amount: number, createDate: string) => void;
	onClose: () => void;
}

const CreateAccountModal: FunctionalComponent<CreateAccountModalProps> = (props) => {
	return !props.isOpen ? null : <CreateAccountModalRender {...props} />
}
	

const CreateAccountModalRender: FunctionalComponent<CreateAccountModalProps> = ({ isOpen, onClose, onCreateAccount }) => {

	const inputRef = useRef<HTMLInputElement>(null);
	
	const [title, handleChangeTitle] = useInput('');
	const [amount, handleChangeAmount] = useInput('');
	const [isIncome, setIsIncome] = useState(false);
	const [date, _, setDate] = useInput(new Date().toISOString());
	const [time, __, setTime] = useInput('');


	const handleChangeIsIncome = (id: string) => () => {
		if (id === 'income') setIsIncome(true);
		else setIsIncome(false);
	}


	const handleSubmit: h.JSX.GenericEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		onCreateAccount(title, isIncome, +amount, date);
	}


	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [inputRef.current]);


	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<Modal.Header heading='새 기록 추가하기' onClose={onClose} />
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
						<TimePicker fluid label='시간' time={time} onChange={(date) => setDate(date)} />
					</div>
					<div style={{ height: '30px' }} />
				</Modal.Content>
				<Modal.Footer>
					<Button border='squared' fluid size='large' type='submit' children='확인' />
				</Modal.Footer>
			</form>
		</Modal>
	)
}

export default CreateAccountModal;
