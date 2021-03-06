import React, { useCallback, useMemo, useState } from 'react';
import { HHmm, HHmmss, Vec2 } from 'types';
import numberUtil from '~/utils/numberUtil';
import Picker from '../../modals/Picker';
import TimePickerInput from './TimePickerInput';
import './TimePicker.scss';
import CustomDate from '~/utils/CustomDate';

export interface TimePickerProps {
  pos: Vec2;
  value: HHmmss | HHmm | '';
  onChange: (value: HHmm) => void;
  onClose: () => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ pos, value, onChange, onClose }) => {
  const [hh, mm] = useMemo(() => {
    const [hh, mm] = (value || new CustomDate().getLocalHHmm()).split(':');
    return [+hh, +mm];
  }, [value]);

  const now = useMemo(() => new Date(), []);

  const [hours, setHours] = useState(hh || now.getHours());
  const [minutes, setMinutes] = useState(mm || now.getMinutes());

  const handleSubmit = useCallback(() => {
    onChange(numberUtil.getZeroNumber(hours) + ':' + numberUtil.getZeroNumber(minutes));
    onClose();
  }, [hours, minutes, onChange, onClose]);

  const handleClear = useCallback(() => {
    onChange('');
    onClose();
  }, [onChange, onClose]);

  return (
    <Picker pos={pos} onClose={onClose}>
      <div className='time-picker'>
        <TimePickerInput value={hours} type='hours' onChange={setHours} />
        <p>:</p>
        <TimePickerInput value={minutes} type='minutes' onChange={setMinutes} />
      </div>

      <Picker.Footer
        primaryText='Ok'
        secondaryText='Cancel'
        onClickPrimary={handleSubmit}
        onClickSecondary={onClose}
        onClear={handleClear}
      />
    </Picker>
  );
};

export default TimePicker;
