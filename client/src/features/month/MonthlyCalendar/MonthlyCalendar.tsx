import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import Button from '~components/elements/Button';
import Calendar from '~components/items/Calendar';
import MonthSelector from '~components/items/MonthSelector';
import NavigationMenu from '~components/items/NavigationMenu';
import useCalendar, { CalendarData } from '~hooks/useCalendar';
import useList from '~hooks/useList';
import { useDispatch, useSelector } from '~utils/redux/hooks';
import { changeMonthNext, changeMonthPrev, changeMonthToday } from '../monthSlice';


const MonthlyCalendar: FunctionalComponent = () => {

	const date = useSelector(state=> state.month.date);
	const dispatch = useDispatch();
	const [selected, setSelected] = useState('calendar');

	const { list, handleUpdate } = useList<CalendarData>([
		{ id: '1', date: '2021-07-10', data: 'data 1' },
		{ id: '2', date: '2021-07-10', data: 'data 2' },
		{ id: '3', date: '2021-07-12', data: 'data 3' },
	]);

	const { calendar, grapping, grappingPos, handleGrap, handleDrop, handleDragging } = useCalendar({
		date,
		data: list,
		onUpdate: handleUpdate
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
