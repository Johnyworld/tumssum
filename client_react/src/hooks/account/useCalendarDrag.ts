import { useCallback } from 'react';
import { Account } from 'types';
import useDrag from '../useDrag';

interface UseCalendarDragProps {
  onDrop: (account: Account) => void;
}

const useCalendarDrag = ({ onDrop }: UseCalendarDragProps) => {
  const { grabbingData, isGrabbing, handleLeave, handleGrap } = useDrag<Account>();

  const handleDrop: (yyyymmdd: string) => React.MouseEventHandler<HTMLLIElement> = useCallback(
    (yyyymmdd: string) => () => {
      if (grabbingData) {
        const [date, time] = grabbingData.data.datetime.split('T');
        if (date !== yyyymmdd)
          onDrop({
            id: grabbingData.data.id,
            datetime: yyyymmdd + (time ? `T${time}` : ''),
          } as Account);
      }
      handleLeave();
    },
    [grabbingData, handleLeave, onDrop]
  );

  return {
    grabbingData,
    isGrabbing,
    handleLeave,
    handleGrap,
    handleDrop,
  };
};

export default useCalendarDrag;
