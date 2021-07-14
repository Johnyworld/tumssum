import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Account } from 'types';
import Button from '~components/elements/Button';
import Input from '~components/elements/Input';
import Calendar from '~components/items/Calendar';
import MonthSelector from '~components/items/MonthSelector';
import NavigationMenu from '~components/items/NavigationMenu';
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
		}
	});

	const { calendar, grapping, grappingPos, handleGrap, handleDrop, handleDragging } = useCalendar({
		date,
		data: list || [],
		onUpdate: handleUpdate,
	});

	const handleCreateAccount = () => {
		if (createNewAccount.loading) return;
		createNewAccount.call({
			user_id: user!.id,
			title,
			account: amount,
			datetime: new Date().toISOString(),
		})
	}

	// const handleCreateAccount = (title: string, amount: number, datetime: string) => {
	// 	if (createNewAccount.loading) return;
	// 	createNewAccount.call({
	// 		user_id: user!.id,
	// 		title,
	// 		account: amount,
	// 		datetime,
	// 	})
	// }

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
					<Button size='small' onClick={handleCreateAccount} children='+ 새로 추가' />
				</div>
			</div>

			<Input name='title' label='title' value={title} onChange={handleChangeTitle} />
			<Input name='amount' label='amount' value={amount} onChange={handleChangeAmount} />
			
			<Calendar
				calendar={calendar}
				grapping={grapping}
				grappingPos={grappingPos}
				onGrap={handleGrap}
				onDrop={handleDrop}
				onDragging={handleDragging}
			/>

		</div>
	)
}


export default MonthlyCalendar;
