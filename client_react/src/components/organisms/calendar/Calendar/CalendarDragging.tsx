import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Vec2 } from 'types';

export interface CalendarDraggingProps {
  itemPos: Vec2 | undefined;
  clickPos: Vec2 | undefined;
  render: (pos: Vec2 | null) => ReactNode;
  onLeave: () => void;
}

const CalendarDragging: React.FC<CalendarDraggingProps> = ({ children, itemPos, clickPos, render, onLeave }) => {
  const [pos, setPos] = useState<Vec2 | null>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      if (itemPos && clickPos) {
        setPos({
          x: itemPos.x + (e.clientX - clickPos.x), // 기존위치 + 이동거리(현재점 - 찍은점)
          y: itemPos.y + (e.clientY - clickPos.y), // 기존위치 + 이동거리(현재점 - 찍은점)
        });
      }
    },
    [clickPos, itemPos]
  );

  useEffect(() => {
    if (!(itemPos && clickPos)) setPos(null);
  }, [clickPos, itemPos]);

  return (
    <div className='calendar-dragging' onMouseMove={handleMouseMove} onMouseLeave={onLeave}>
      {children}
      {render(pos)}
    </div>
  );
};

export default CalendarDragging;
