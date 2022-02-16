import React from 'react';
import useDragSidebar from '~/hooks/useDragSidebar';
import './FlexableSideLayout.scss';

interface FlexableSideLayoutProps {
  left: React.ReactElement;
  right: React.ReactElement;
}

const FlexableSideLayout: React.FC<FlexableSideLayoutProps> = ({ left, right }) => {
  const { borderRef, sideWidth, onBorderMouseDown, onContainerMouseUp, onContainerMouseLeave, onContainerMouseMove } =
    useDragSidebar();

  return (
    <div
      className='flexable-side-layout'
      onMouseUp={onContainerMouseUp}
      onMouseLeave={onContainerMouseLeave}
      onMouseMove={onContainerMouseMove}
    >
      <div className='flexable-side-layout__left'>{left}</div>

      <div className='flexable-side-layout__bar' ref={borderRef} onMouseDown={onBorderMouseDown} />

      <div className='flexable-side-layout__right' style={{ minWidth: sideWidth }}>
        {right}
      </div>
    </div>
  );
};

export default FlexableSideLayout;
