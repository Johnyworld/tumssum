import { useCallback, useState } from 'react';

type UseToggle = (defaultValue?: boolean) => [boolean, () => void, () => void];

const useToggle: UseToggle = (defaultValue) => {
  const [value, setValue] = useState(defaultValue || false);
  const open = useCallback(() => setValue(true), []);
  const close = useCallback(() => setValue(false), []);
  return [value, open, close];
};

export default useToggle;
