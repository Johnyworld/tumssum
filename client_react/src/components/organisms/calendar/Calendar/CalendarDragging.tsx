import React, { useCallback, useEffect, useState } from 'react';
import { GrabbingData, Vec2 } from 'types';
import CalendarAccountItem from '../CalendarAccountItem';

export interface CalendarDraggingProps {
  grabbingData: GrabbingData | null;
  onLeave: () => void;
}

const CalendarDragging: React.FC<CalendarDraggingProps> = ({ children, grabbingData, onLeave }) => {
  const [pos, setPos] = useState<Vec2 | null>(null);

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      if (grabbingData) {
        setPos({
          x: grabbingData.pos.x + (e.clientX - grabbingData.client.x), // 기존위치 + 이동거리(현재점 - 찍은점)
          y: grabbingData.pos.y + (e.clientY - grabbingData.client.y), // 기존위치 + 이동거리(현재점 - 찍은점)
        });
      }
    },
    [grabbingData]
  );

  useEffect(() => {
    if (!grabbingData) setPos(null);
  }, [grabbingData]);

  return (
    <div className='calendar-dragging' onMouseMove={onMouseMove} onMouseLeave={onLeave}>
      {children}

      {grabbingData && pos && (
        <CalendarAccountItem
          account={grabbingData.data}
          className='calendar__grabbed-item'
          style={{
            top: pos.y + 'px',
            left: pos.x + 'px',
            width: grabbingData.width + 'px',
            height: grabbingData.height + 'px',
          }}
        />
      )}
    </div>
  );
};

export default CalendarDragging;
