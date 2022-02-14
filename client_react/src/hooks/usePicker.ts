import React, { useCallback, useState } from 'react';
import { Vec2 } from 'types';

type UsePicker = () => [Vec2 | null, React.MouseEventHandler<HTMLDivElement>, () => void];

const usePicker: UsePicker = () => {
  const [pos, setPos] = useState<Vec2 | null>(null);

  const handleShowPicker: React.MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      if (pos) setPos(null);
      else {
        const rect = e.currentTarget.getBoundingClientRect();
        const height = e.currentTarget.clientHeight;
        let x = rect.x;
        let y = rect.y + rect.height - 1;
        if (y + height > window.innerHeight && y > height) {
          y = y - height - rect.height + 2;
        }
        setPos({ x, y });
      }
    },
    [pos]
  );

  const handleClosePicker = useCallback(() => {
    setPos(null);
  }, []);

  return [pos, handleShowPicker, handleClosePicker];
};

export default usePicker;
