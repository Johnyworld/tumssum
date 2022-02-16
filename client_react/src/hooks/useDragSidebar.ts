import { useCallback, useMemo, useRef, useState } from 'react';

const SIDE_WIDTH_MAX = 800;
const SIDE_WIDTH_DEFAULT = 350;
const SIDE_WIDTH_MIN = 320;

const useDragSidebar = () => {
  const borderRef = useRef<HTMLDivElement>(null);

  const init = useMemo(() => localStorage.getItem('home_side') || SIDE_WIDTH_DEFAULT, []);
  const [sideWidth, setSideWidth] = useState<number>(+init);
  const [tempWidth, setTempWidth] = useState<number>(0);
  const [grabPos, setGrabPos] = useState<number | null>(null);

  const onBorderMouseDown: React.MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      setGrabPos(e.clientX);
      setTempWidth(sideWidth);
    },
    [sideWidth]
  );

  const onContainerMouseUp: React.MouseEventHandler<HTMLDivElement | HTMLElement> = useCallback(
    e => {
      localStorage.setItem('home_side', sideWidth + '');
      setGrabPos(null);
    },
    [sideWidth]
  );

  const onContainerMouseMove: React.MouseEventHandler<HTMLElement> = useCallback(
    e => {
      if (grabPos) {
        const movePos = grabPos - e.clientX;
        const newWidth = tempWidth + movePos;
        setSideWidth(
          newWidth > SIDE_WIDTH_MAX ? SIDE_WIDTH_MAX : newWidth < SIDE_WIDTH_MIN ? SIDE_WIDTH_MIN : newWidth
        );
      }
    },
    [grabPos, tempWidth]
  );

  return {
    borderRef,
    sideWidth,
    onBorderMouseDown,
    onContainerMouseUp,
    onContainerMouseLeave: onContainerMouseUp,
    onContainerMouseMove,
  };
};

export default useDragSidebar;
