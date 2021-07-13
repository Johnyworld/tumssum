import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Account } from 'types';
import Button from '~components/elements/Button';
import Calendar from '~components/items/Calendar';
import MonthSelector from '~components/items/MonthSelector';
import NavigationMenu from '~components/items/NavigationMenu';
import useCalendar from '~hooks/useCalendar';
import useFetch from '~hooks/useFetch';
import { useDispatch, useSelector } from '~utils/redux/hooks';
import { changeMonthNext, changeMonthPrev, changeMonthToday } from '../monthSlice';


const MonthlyCalendar: FunctionalComponent = () => {

	const date = useSelector(state=> state.month.date);
	const user = useSelector(state=> state.user.userInfo);
	const dispatch = useDispatch();
	const [selected, setSelected] = useState('calendar');

	const accounts = useFetch<Account[]>({
		method: 'GET',
		url: `/api/accounts/`,
		params: { user_id: user!.id },
	});

	if (!accounts.data) return null;

	const { calendar, grapping, grappingPos, handleGrap, handleDrop, handleDragging } = useCalendar({
		date,
		data: accounts.data,
		onUpdate: (i, data) => {console.log(i, data)}
	});


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
					<Button size='small' children='+ 새로 추가' />
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
			
		</div>
	)
}


export default MonthlyCalendar;
