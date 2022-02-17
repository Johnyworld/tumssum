import { useMemo, useState } from 'react';
import CustomDate from '~/utils/CustomDate';

const useDatetimeInput = (defaultDatetime?: string) => {
  const [defaultDate, defaultTime] = useMemo(() => {
    const datetime = defaultDatetime || new CustomDate().getLocalDate();
    const [date, time] = datetime.split('T');
    return [date, time || ''];
  }, [defaultDatetime]);

  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState(defaultTime);

  const datetime = time ? `${date}T${time}` : date;

  return {
    yyyymmdd: date,
    time,
    datetime,
    setDate,
    setTime,
  };
};

export default useDatetimeInput;
