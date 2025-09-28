import React from 'react';
import { useDragGesture } from '../hooks/useDragGesture';
import type { DragGestureOptions } from '../hooks/useDragGesture';

interface DraggableWrapperProps extends DragGestureOptions {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
  children,
  className = '',
  style = {},
  ...dragOptions
}) => {
  const { dragState, mouseEvents, touchEvents, dragOffset, getTransformStyle } = useDragGesture(dragOptions);

  // Calculate opacity based on drag state
  const opacity = dragState.isDragging 
    ? Math.max(0.3, 1 - Math.abs(dragOffset) / 300)
    : 1;

  const wrapperStyle: React.CSSProperties = {
    ...getTransformStyle(),
    opacity,
    transition: dragState.isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: dragState.isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
    ...style
  };

  return (
    <div
      className={`draggable-wrapper ${className}`}
      style={wrapperStyle}
      {...mouseEvents}
      {...touchEvents}
    >
      {children}
    </div>
  );
};

export default DraggableWrapper;