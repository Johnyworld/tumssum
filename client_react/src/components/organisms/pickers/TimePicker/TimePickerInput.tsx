import React from 'react';
import Icon from '~/components/atoms/Icon';
import numberUtil from '~/utils/numberUtil';

export interface TimePickerInputProps {
  value: number;
  type: 'hours' | 'minutes';
  onChange: (value: number) => void;
}

const TimePickerInput: React.FC<TimePickerInputProps> = ({ value, type, onChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    onChange(+e.currentTarget.value);
  };

  const handleChangeByArrow: (sum: number) => React.MouseEventHandler<HTMLDivElement> = sum => () => {
    onChange(numberUtil.getLimit(value + sum, type === 'hours' ? 24 : 60));
  };

  return (
    <div className='time-picker__input'>
      <Icon as='arrowUp' onClick={handleChangeByArrow(+1)} />
      <input
        className='time-picker__input-input'
        type='number'
        min={0}
        max={23}
        maxLength={2}
        value={value}
        onChange={handleChange}
      />
      <Icon as='arrowDown' onClick={handleChangeByArrow(-1)} />
    </div>
  );
};

export default TimePickerInput;
