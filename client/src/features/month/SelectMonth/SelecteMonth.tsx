import { h, FunctionalComponent } from 'preact';
import { useDispatch } from 'react-redux';
import MonthSelector from '~components/items/MonthSelector';
import { useSelector } from '~utils/redux/hooks';
import { changeMonthNext, changeMonthPrev } from '../monthSlice';


const SelecteMonth: FunctionalComponent = ({  }) => {

	const date = useSelector(state=> state.month.date);
	const dispatch = useDispatch();

	return (
		<MonthSelector date={date} onPrev={() => dispatch(changeMonthPrev())} onNext={() => dispatch(changeMonthNext())} />
	)
}

export default SelecteMonth;
