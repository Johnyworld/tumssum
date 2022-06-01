import React from 'react';
import { HHmmss, HHmm } from 'types';
import TimePicker from '~/components/organisms/pickers/TimePicker';
import usePicker from '~/hooks/usePicker';
import { c } from '~/utils/classNames';
import './ContentTime.scss';

export interface ContentTimeProps {
  label?: string;
  placeholder: string;
  value: HHmmss | HHmm | '';
  onChange: (value: HHmm) => void;
}

const ContentTime: React.FC<ContentTimeProps> = ({ label, placeholder, value, onChange }) => {
  const [pos, showPicker, closePicker] = usePicker();

  return (
    <div className='content-time'>
      {label && <p className='content-time__label'>{label}</p>}

      <div className={c('content-time__content', [!value, '&--disabled'])} onClick={showPicker}>
        {value ? value.substring(0, 5) : placeholder}
      </div>

      {pos && <TimePicker pos={pos} value={value} onChange={onChange} onClose={closePicker} />}
    </div>
  );
};

export default ContentTime;
