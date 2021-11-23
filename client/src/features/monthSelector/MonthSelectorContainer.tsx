import { h, FunctionalComponent } from 'preact';
import Header from '~components/layouts/Header';
import MonthSelector from '~components/molecules/MonthSelector';
import { useDispatch, useSelector } from '~utils/redux/hooks';
import { changeMonth, changeMonthNext, changeMonthPrev } from '~stores/dateSlice';
import { memo } from 'preact/compat';



const MonthSelectorContainer: FunctionalComponent = ({  }) => {
	
	const { currentDate, today } = useSelector(state=> state.date);
	const dispatch = useDispatch();

	return (
		<Header>
			<MonthSelector
				date={currentDate}
				today={today}
				onChange={yyyymm => dispatch(changeMonth(yyyymm))}
				onPrev={() => dispatch(changeMonthPrev())}
				onNext={() => dispatch(changeMonthNext())}
			/>
		</Header>
	)
}

export default memo(MonthSelectorContainer);
