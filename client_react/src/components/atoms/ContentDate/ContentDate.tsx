import React from 'react';
import DatePicker from '~/components/organisms/pickers/DatePicker';
import CustomDate from '~/utils/CustomDate';
import usePicker from '~/hooks/usePicker';
import './ContentDate.scss';
import { c } from '~/utils/classNames';

export interface ContentDateProps {
  yyyymmdd: string;
  label?: string;
  placeholder: string;
  onChange: (yyyymmdd: string) => void;
}

const ContentDate: React.FC<ContentDateProps> = ({ label, yyyymmdd, placeholder, onChange }) => {
  const [pos, showPicker, closePicker] = usePicker();

  return (
    <div className='content-date'>
      {label && <p className='content-date__label'>{label}</p>}

      <div className={c('content-date__content', [!yyyymmdd, '&--disabled'])} onClick={showPicker}>
        {yyyymmdd ? new CustomDate(yyyymmdd).getLocalString() : placeholder}
      </div>

      {pos && <DatePicker pos={pos} yyyymmdd={yyyymmdd} onChange={onChange} onClose={closePicker} />}
    </div>
  );
};

export default ContentDate;
