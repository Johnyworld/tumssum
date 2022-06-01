import React from 'react';
import DatePicker from '~/components/organisms/pickers/DatePicker';
import CustomDate from '~/utils/CustomDate';
import usePicker from '~/hooks/usePicker';
import './ContentDate.scss';
import { c } from '~/utils/classNames';
import { YYYYMMDD } from 'types';

export interface ContentDateProps {
  label?: string;
  placeholder: string;
  value: YYYYMMDD | '';
  onChange: (value: YYYYMMDD) => void;
}

const ContentDate: React.FC<ContentDateProps> = ({ label, value, placeholder, onChange }) => {
  const [pos, showPicker, closePicker] = usePicker();

  return (
    <div className='content-date'>
      {label && <p className='content-date__label'>{label}</p>}

      <div className={c('content-date__content', [!value, '&--disabled'])} onClick={showPicker}>
        {value ? new CustomDate(value).getLocalString() : placeholder}
      </div>

      {pos && <DatePicker pos={pos} value={value} onChange={onChange} onClose={closePicker} />}
    </div>
  );
};

export default ContentDate;
