import { useCallback, useState } from 'react';
import { Account, GrabbingData } from 'types';

interface UseCalendarDragProps {
  onDrop: (account: Account) => void;
}

const useCalendarDrag = ({ onDrop }: UseCalendarDragProps) => {
  const [grabbingData, setGrabbingData] = useState<GrabbingData | null>(null);

  const handleLeave = useCallback(() => {
    setGrabbingData(null);
  }, []);

  const handleGrap: (data: Account) => React.MouseEventHandler<HTMLLIElement> = useCallback(
    data => e => {
      const rect = e.currentTarget.getBoundingClientRect();
      setGrabbingData({
        pos: { x: rect.x, y: rect.y },
        client: { x: e.clientX, y: e.clientY },
        width: rect.width,
        height: rect.height,
        data,
      });
    },
    []
  );

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
    grabbingData, // CalendarDragging 컴포넌트에 주입
    isGrabbing: !!grabbingData,
    handleLeave, // CalendarDragging 컴포넌트에 주입
    handleGrap, // CalendarDateRow 컴포넌트에 주입
    handleDrop, // CalendarDateRow 컴포넌트에 주입
  };
};

export default useCalendarDrag;
