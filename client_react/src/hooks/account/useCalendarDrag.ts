import { useCallback, useState } from 'react';
import { Account, GrabbingData } from 'types';

interface UseCalendarDragProps {
  onDrop: (id: number, datetime: string) => void;
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
        const time = grabbingData.data.datetime.split('T')[1];
        onDrop(grabbingData.data.id, yyyymmdd + (time ? `T${time}` : ''));
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
