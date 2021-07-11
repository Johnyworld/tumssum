import { h, FunctionalComponent } from 'preact';
import Calendar from '~components/items/Calendar';
import MonthSelector from '~components/items/MonthSelector';
import useCalendar, { CalendarData } from '~hooks/useCalendar';
import useList from '~hooks/useList';
import { useDispatch, useSelector } from '~utils/redux/hooks';
import { changeMonthNext, changeMonthPrev } from '../monthSlice';


const MonthlyCalendar: FunctionalComponent = () => {

	const date = useSelector(state=> state.month.date);
	const dispatch = useDispatch();

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
