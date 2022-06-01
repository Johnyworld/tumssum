import React, { useCallback, useMemo, useState } from 'react';
import { Vec2 } from 'types';
import CalendarBase from '~/utils/CalendarBase';
import { c } from '~/utils/classNames';
import CustomDate from '~/utils/CustomDate';
import numberUtil from '~/utils/numberUtil';
import Picker from '../../modals/Picker';
import './DatePicker.scss';

export interface DatePickerProps {
  pos: Vec2;
  yyyymmdd: string;
  onChange: (yyyymmdd: string) => void;
  onClose: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ pos, yyyymmdd, onChange, onClose }) => {
  const [yyyymm, dd] = useMemo(() => {
    const [yyyy, mm, dd] = yyyymmdd.split('-');
    return [`${yyyy}-${mm}`, dd];
  }, [yyyymmdd]);

  const today = useMemo(() => new CustomDate().getLocalYYYYMMDD().split('-')[2], []);

  const [viewMonth, setViewMonth] = useState(yyyymm);

  const handlePrevMonth = useCallback(() => {
    const then = new CustomDate(viewMonth);
    then.setMonth(-1);
    setViewMonth(then.getLocalYYYYMM());
  }, [viewMonth]);

  const handleNextMonth = useCallback(() => {
    const then = new CustomDate(viewMonth);
    then.setMonth(+1);
    setViewMonth(then.getLocalYYYYMM());
  }, [viewMonth]);

  const handleToday = useCallback(() => {
    const then = new CustomDate();
    onChange(then.getLocalYYYYMMDD());
    onClose();
  }, [onChange, onClose]);

  const handleSelect = useCallback(
    (date: number) => {
      if (!date) return;
      onChange(viewMonth + '-' + numberUtil.getZeroNumber(date));
      onClose();
    },
    [onChange, onClose, viewMonth]
  );

  const calendarBase = useMemo(() => new CalendarBase(yyyymm).getCalendar(), [yyyymm]);

  return (
    <Picker pos={pos} onClose={onClose}>
      <Picker.Header
        title={new CustomDate(viewMonth).getLocalStringYM()}
        onClickPrev={handlePrevMonth}
        onClickNext={handleNextMonth}
      />

      <div className='date-picker'>
        <div className='date-picker__days'>
          {['sun', 'mon', 'tue', 'web', 'thu', 'fri', 'sat'].map(day => (
            <div className='date-picker__day' key={day}>
              {day}
            </div>
          ))}
        </div>

        {calendarBase.map((row, i) => (
          <div key={i} className='date-picker__row'>
            {row.map(date => {
              const dateNumber = +date.yyyymmdd.split('-')[2] || 0;
              return (
                <div
                  key={date.yyyymmdd}
                  className={c(
                    'date-picker__date',
                    [+today === dateNumber, '&--today'],
                    [+dd === dateNumber, '&--selected']
                  )}
                  children={date.isThisMonth ? dateNumber : ''}
                  onClick={date.isThisMonth ? () => handleSelect(dateNumber) : undefined}
                />
              );
            })}
          </div>
        ))}
      </div>

      <Picker.Footer primaryText='Today' onClickPrimary={handleToday} />
    </Picker>
  );
};

export default DatePicker;
