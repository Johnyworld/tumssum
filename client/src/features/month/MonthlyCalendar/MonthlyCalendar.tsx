import { h, FunctionalComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Account } from 'types';
import Button from '~components/elements/Button';
import DatePicker from '~components/elements/DatePicker';
import Input from '~components/elements/Input';
import Selector from '~components/elements/Selector/Selector';
import Calendar from '~components/items/Calendar';
import MonthSelector from '~components/items/MonthSelector';
import NavigationMenu from '~components/items/NavigationMenu';
import Modal from '~components/layouts/Modal';
import useCalendar from '~hooks/useCalendar';
import useFetch from '~hooks/useFetch';
import useInput from '~hooks/useInput';
import useList from '~hooks/useList';
import useToggle from '~hooks/useToggle';
import { useDispatch, useSelector } from '~utils/redux/hooks';
import { changeMonthNext, changeMonthPrev, changeMonthToday } from '../monthSlice';


const MonthlyCalendar: FunctionalComponent = () => {

	const date = useSelector(state=> state.month.date);
	const user = useSelector(state=> state.user.userInfo);
	const dispatch = useDispatch();
	const toggleCreateModal = useToggle();
	const [selected, setSelected] = useState('calendar');
	const [create, setCreate] = useState('minus');
	const inputRef = useRef<HTMLInputElement>(null);
	const [createDate, _, setValue] = useInput(new Date().toISOString());

	const [title, handleChangeTitle] = useInput('');
	const [amount, handleChangeAmount] = useInput('');

	const { list, setList, handleUpdate, handleAdd } = useList<Account>([]);

	useFetch<Account[]>({
		method: 'GET',
		url: `/api/accounts/`,
		params: { user_id: user!.id },
		onSuccess: data => {
			setList(data);
		}
	});

	const createNewAccount = useFetch<Account>({
		method: 'POST',
		url: '/api/account/',
		onSuccess: data => {
			handleAdd(data);
			toggleCreateModal.handleOff();
		}
	});

	const { calendar, grapping, grappingPos, handleGrap, handleDrop, handleDragging } = useCalendar({
		date,
		data: list || [],
		onUpdate: handleUpdate,
	});

	const handleCreateAccount: h.JSX.GenericEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		if (createNewAccount.loading) return;
		createNewAccount.call({
			user_id: user!.id,
			title,
			account: create === 'minus' ? -amount : amount,
			datetime: new Date().toISOString(),
		})
	}


	useEffect(() => {
		if (inputRef.current && toggleCreateModal.checked) {
			inputRef.current.focus();
		}
	}, [inputRef.current, toggleCreateModal.checked]);

	return (
		<div class='monthly-calendar' >

			<MonthSelector
				date={date}
				onPrev={() => dispatch(changeMonthPrev())}
				onNext={() => dispatch(changeMonthNext())}
			/>

			<div class='flex mv-large mv-none-tablet p-small-tablet'>
				<NavigationMenu
					selected={selected}
					onChange={(selected) => setSelected(selected)}
					list={[
						{ id: 'calendar', text: 'Calendar', icon: 'calendar' },
						{ id: 'category', text: 'Category', icon: 'menu' },
						{ id: 'bank', text: 'Bank', icon: 'storage' },
					]}
				/>
				<div class='flex flex-gap-regular' style={{ paddingRight: '.5rem' }}>
					<p class='f-bold t-fit pointer' onClick={() => dispatch(changeMonthToday())}>Today</p>
					<Button size='small' onClick={toggleCreateModal.handleOn} children='+ 새로 추가' />
				</div>
			</div>

			<Calendar
				calendar={calendar}
				grapping={grapping}
				grappingPos={grappingPos}
				onGrap={handleGrap}
				onDrop={handleDrop}
				onDragging={handleDragging}
			/>

			<Modal isOpen={toggleCreateModal.checked} onClose={toggleCreateModal.handleOff} >
				<form onSubmit={handleCreateAccount}>
					<Modal.Header heading='새 기록 추가하기' onClose={toggleCreateModal.handleOff} />
					<Modal.Content padding class='gap-regular'>
						<Selector
							fluid
							label='지출/수입'
							selected={create}
							onChange={(id) => () => setCreate(id)}
							list={[
								{ id: 'minus', text: '지출' },
								{ id: 'plus', text: '수입' },
							]}
						/>
						<Input fluid required name='title' label='제목' placeholder='무엇을 지출/수입 하셨나요?' value={title} onChange={handleChangeTitle} inputRef={inputRef} />
						<Input fluid required name='amount' label='금액' placeholder='금액을 입력하세요.' value={amount} onChange={handleChangeAmount} type='number' min={0} removeAutoComplete />
						<div class='grid grid-col-2 grid-gap-regular'>
							<DatePicker fluid label='날짜' date={createDate} onChange={(date) => setValue(date)} />
							<DatePicker fluid label='날짜' date={createDate} onChange={(date) => setValue(date)} />
						</div>
						<div style={{ height: '30px' }} />
					</Modal.Content>
					<Modal.Footer>
						<Button border='squared' fluid size='large' type='submit' children='확인' />
					</Modal.Footer>
				</form>
			</Modal>

		</div>
	)
}


export default MonthlyCalendar;
