import { useMemo, useState } from 'react';
import { Vec2 } from 'types';
import { c } from '~/utils/classNames';
import CustomDate from '~/utils/CustomDate';
import numberUtil from '~/utils/numberUtil';
import Picker from '../../modals/Picker';
import './MonthPicker.scss';

export interface MonthPickerProps {
  pos: Vec2;
  yyyymm: string;
  onChange: (yyyymm: string) => void;
  onClose: () => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ pos, yyyymm, onChange, onClose }) => {
  const [yyyy, mm, thisYear, thisMonth] = useMemo(() => {
    const then = new Date();
    const [yyyystring, mmstring] = yyyymm.split('-');
    return [+yyyystring, +mmstring, then.getFullYear(), then.getMonth() + 1];
  }, [yyyymm]);

  const [viewYear, setViewYear] = useState(yyyy);

  const isCurrentYear = thisYear === viewYear;
  const isSelectedYear = yyyy === viewYear;

  const handlePrevYear = () => {
    setViewYear(viewYear - 1);
  };

  const handleNextYear = () => {
    setViewYear(viewYear + 1);
  };

  const handleToday = () => {
    const then = new CustomDate();
    onChange(then.getLocalYearMonth());
    onClose();
  };

  const handleSelect = (month: number) => {
    onChange(viewYear + '-' + numberUtil.getZeroNumber(month));
    onClose();
  };

  return (
    <Picker pos={pos} onClose={onClose}>
      <Picker.Header title={viewYear} onClickPrev={handlePrevYear} onClickNext={handleNextYear} />

      <div className='month-picker'>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={c(
              'month-picker__month',
              [thisMonth === i + 1 && isCurrentYear, '&--this-month'],
              [mm === i + 1 && isSelectedYear, '&--selected']
            )}
            children={i + 1}
            onClick={() => handleSelect(i + 1)}
          />
        ))}
      </div>

      <Picker.Footer primaryText='Today' onClickPrimary={handleToday} />
    </Picker>
  );
};

export default MonthPicker;
