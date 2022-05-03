import { useCallback, useState } from 'react';
import { GrabbingData } from 'types';

const useDrag = <T>() => {
  const [grabbingData, setGrabbingData] = useState<GrabbingData<T> | null>(null);

  const handleLeave = useCallback(() => {
    setGrabbingData(null);
  }, []);

  const handleGrap: (data: T) => React.MouseEventHandler<HTMLLIElement> = useCallback(
    data => e => {
      const rect = e.currentTarget.getBoundingClientRect();
      setGrabbingData({
        itemPos: { x: rect.x, y: rect.y },
        clickPos: { x: e.clientX, y: e.clientY },
        width: rect.width,
        height: rect.height,
        data,
      });
    },
    []
  );

  return {
    grabbingData, // CalendarDragging 컴포넌트에 주입
    isGrabbing: !!grabbingData,
    handleLeave, // CalendarDragging 컴포넌트에 주입
    handleGrap, // CalendarDateRow 컴포넌트에 주입
  };
};

export default useDrag;
