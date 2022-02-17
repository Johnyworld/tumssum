import React from 'react';
import TimePicker from '~/components/organisms/pickers/TimePicker';
import usePicker from '~/hooks/usePicker';
import './ContentTime.scss';

export interface ContentTimeProps {
  time: string;
  label?: string;
  onChange: (time: string) => void;
}

const ContentTime: React.FC<ContentTimeProps> = ({ time, label, onChange }) => {
  const [pos, showPicker, closePicker] = usePicker();

  return (
    <div className='content-time'>
      {label && <p className='content-time__label'>{label}</p>}

      <div className='content-time__content' onClick={showPicker}>
        {time.substring(0, 5)}
      </div>

      {pos && <TimePicker pos={pos} time={time} onChange={onChange} onClose={closePicker} />}
    </div>
  );
};

export default ContentTime;
