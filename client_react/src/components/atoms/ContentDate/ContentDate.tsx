import React from 'react';
import DatePicker from '~/components/organisms/pickers/DatePicker';
import CustomDate from '~/utils/CustomDate';
import usePicker from '~/hooks/usePicker';
import './ContentDate.scss';

export interface ContentDateProps {
  yyyymmdd: string;
  label?: string;
  onChange: (yyyymmdd: string) => void;
}

const ContentDate: React.FC<ContentDateProps> = ({ label, yyyymmdd, onChange }) => {
  const then = new CustomDate();

  const [pos, showPicker, closePicker] = usePicker();

  return (
    <div className='content-date'>
      {label && <p className='content-dropdown__label'>{label}</p>}
      <div className='content-date__content' onClick={showPicker}>
        {then.getLocalString()}
      </div>

      {pos && <DatePicker pos={pos} yyyymmdd={yyyymmdd} onChange={onChange} onClose={closePicker} />}
    </div>
  );
};

export default ContentDate;
