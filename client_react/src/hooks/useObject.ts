import { useCallback, useState } from 'react';

const useObject = <T>(defaultData?: T) => {
  const [data, setData] = useState<T | null>(defaultData || null);

  // prettier-ignore
  const update = useCallback((newData: T) => {
    setData({ ...data, ...newData });
  }, [data]);

  const set = useCallback((newData: T) => {
    setData(newData);
  }, []);

  const reset = useCallback(() => {
    setData(null);
  }, []);

  return {
    data,
    update,
    set,
    reset,
  };
};

export default useObject;
