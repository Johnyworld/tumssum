import { useCallback, useState } from 'react';
import { HHmmss, YYYYMMDD, YYYYMMDDHHmmss } from 'types';
import CustomDate from '~/utils/CustomDate';

const useDatetimeInput = (defaultDatetime?: YYYYMMDDHHmmss) => {

  const [customDate, setDate] = useState(new CustomDate(defaultDatetime));

  const handleChangeDate = useCallback((date: YYYYMMDD)=> {
    const then = new CustomDate(customDate.getLocalYYYYMMDDHHmmss());
    then.setYYYYMMDD(date);
    setDate(then);
  }, [customDate]);

  const handleChangeTime = useCallback((time: HHmmss) => {
    const then = new CustomDate(customDate.getLocalYYYYMMDDHHmmss());
    then.setHHmmss(time);
    setDate(then);
  }, [customDate]);

  return {
    customDate,
    handleChangeDate,
    handleChangeTime,
  };
};

export default useDatetimeInput;
