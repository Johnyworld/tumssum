import React from 'react';
import MonthSelectorHeader from '~/components/organisms/headers/MonthSelectorHeader';
import MonthPicker from '~/components/organisms/pickers/MonthPicker';
import usePicker from '~/hooks/usePicker';
import { modifyMonth, setCalendarMonth } from '~/stores/calendarSlice';
import { useDispatch, useSelector } from '~/utils/reduxHooks';

const DateSelectorContainer: React.FC = () => {
  const dispatch = useDispatch();
  const yyyymm = useSelector(state => state.calendar.yyyymm);

  const [pos, onOpenPicker, onClosePicker] = usePicker();

  const handleChange = (yyyymm: string) => dispatch(setCalendarMonth(yyyymm));
  const handlePrev = () => dispatch(modifyMonth(-1));
  const handleNext = () => dispatch(modifyMonth(1));

  return (
    <>
      <MonthSelectorHeader
        yyyymm={yyyymm}
        onClickOpenPicker={onOpenPicker}
        onClickPrev={handlePrev}
        onClickNext={handleNext}
      />

      <MonthPicker pos={pos} yyyymm={yyyymm} onChange={handleChange} onClose={onClosePicker} />
    </>
  );
};

export default DateSelectorContainer;
