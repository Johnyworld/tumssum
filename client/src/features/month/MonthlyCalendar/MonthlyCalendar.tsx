import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import Calendar from '~components/items/Calendar';
import MonthSelector from '~components/items/MonthSelector';
import NavigationMenu from '~components/items/NavigationMenu';
import useCalendar, { CalendarData } from '~hooks/useCalendar';
import useList from '~hooks/useList';
import { useDispatch, useSelector } from '~utils/redux/hooks';
import { changeMonthNext, changeMonthPrev } from '../monthSlice';


const MonthlyCalendar: FunctionalComponent = () => {

	const date = useSelector(state=> state.month.date);
	const dispatch = useDispatch();
	const [selected, setSelected] = useState('home');

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

			<NavigationMenu
				class='mv-large'
				selected={selected}
				onChange={(selected) => setSelected(selected)}
				list={[
					{ id: 'calendar', text: 'Calendar', icon: 'calendar' },
					{ id: 'category', text: 'Category', icon: 'menu' },
					{ id: 'bank', text: 'Bank', icon: 'storage' },
				]}
			/>
			
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
