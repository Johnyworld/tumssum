import { h, FunctionalComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Account } from 'types';
import Button from '~components/elements/Button';
import Calendar from '~components/items/Calendar';
import MonthSelector from '~components/items/MonthSelector';
import NavigationMenu from '~components/items/NavigationMenu';
import Modal from '~components/layouts/Modal';
import CreateAccountModal from '~components/partials/CreateAccountModal';
import useCalendar from '~hooks/useCalendar';
import useFetch from '~hooks/useFetch';
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
	const inputRef = useRef<HTMLInputElement>(null);

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

	const handleCreateAccount = (title: string, isIncome: boolean, amount: number, datetime: string) => {
		if (createNewAccount.loading) return;
		createNewAccount.call({
			user_id: user!.id,
			title,
			account: isIncome ? amount : -amount,
			datetime,
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

			<Modal
				isOpen={toggleCreateModal.checked}
				onClose={toggleCreateModal.handleOff}
				children={
					<CreateAccountModal
						onCreateAccount={handleCreateAccount}
						onClose={toggleCreateModal.handleOff}
					/>
				}
			/>

		</div>
	)
}


export default MonthlyCalendar;
