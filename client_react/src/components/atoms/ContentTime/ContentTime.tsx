import React from 'react';
import TimePicker from '~/components/organisms/pickers/TimePicker';
import usePicker from '~/hooks/usePicker';
import { c } from '~/utils/classNames';
import './ContentTime.scss';

export interface ContentTimeProps {
  time: string;
  label?: string;
  placeholder: string;
  onChange: (time: string) => void;
}

const ContentTime: React.FC<ContentTimeProps> = ({ time, label, placeholder, onChange }) => {
  const [pos, showPicker, closePicker] = usePicker();

  return (
    <div className='content-time'>
      {label && <p className='content-time__label'>{label}</p>}

      <div className={c('content-time__content', [!time, '&--disabled'])} onClick={showPicker}>
        {time ? time.substring(0, 5) : placeholder}
      </div>

      {pos && <TimePicker pos={pos} time={time} onChange={onChange} onClose={closePicker} />}
    </div>
  );
};

export default ContentTime;
