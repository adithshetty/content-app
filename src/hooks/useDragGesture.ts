import { useState, useCallback } from 'react';

export interface DragState {
  isDragging: boolean;
  dragOffset: number;
  dragStartX: number;
}

export interface DragGestureOptions {
  threshold?: number; // Minimum distance to trigger action
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  enabled?: boolean;
  circularMotion?: boolean; // Enable circular dragging animation
  radius?: number; // Radius for circular motion
}

export const useDragGesture = (options: DragGestureOptions = {}) => {
  const {
    threshold = 100,
    onSwipeLeft,
    onSwipeRight,
    enabled = true,
    circularMotion = false,
    radius = 150
  } = options;

  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragOffset: 0,
    dragStartX: 0
  });

  const handleDragStart = useCallback((clientX: number) => {
    if (!enabled) return;
    
    setDragState({
      isDragging: true,
      dragOffset: 0,
      dragStartX: clientX
    });
  }, [enabled]);

  const handleDragMove = useCallback((clientX: number) => {
    if (!enabled || !dragState.isDragging) return;

    const offset = clientX - dragState.dragStartX;
    setDragState(prev => ({
      ...prev,
      dragOffset: offset
    }));
  }, [enabled, dragState.isDragging, dragState.dragStartX]);

  const handleDragEnd = useCallback(() => {
    if (!enabled || !dragState.isDragging) return;

    const { dragOffset } = dragState;
    
    // Determine swipe direction and trigger callbacks
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (dragOffset < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }

    // Reset drag state
    setDragState({
      isDragging: false,
      dragOffset: 0,
      dragStartX: 0
    });
  }, [enabled, dragState, threshold, onSwipeLeft, onSwipeRight]);

  // Mouse events
  const mouseEvents = {
    onMouseDown: (e: React.MouseEvent) => {
      e.preventDefault();
      handleDragStart(e.clientX);
    },
    onMouseMove: (e: React.MouseEvent) => {
      handleDragMove(e.clientX);
    },
    onMouseUp: handleDragEnd,
    onMouseLeave: handleDragEnd
  };

  // Touch events
  const touchEvents = {
    onTouchStart: (e: React.TouchEvent) => {
      handleDragStart(e.touches[0].clientX);
    },
    onTouchMove: (e: React.TouchEvent) => {
      e.preventDefault();
      handleDragMove(e.touches[0].clientX);
    },
    onTouchEnd: handleDragEnd
  };

  // Calculate circular transform
  const getCircularTransform = useCallback(() => {
    if (!circularMotion || !dragState.isDragging) {
      return { x: dragState.dragOffset, y: 0, rotation: 0 };
    }

    const progress = Math.max(-1, Math.min(1, dragState.dragOffset / threshold));
    const angle = progress * Math.PI * 0.25; // Max 45 degrees rotation
    
    const x = radius * Math.sin(angle);
    const y = radius * (1 - Math.cos(angle));
    const rotation = angle * (180 / Math.PI);

    return { x, y, rotation };
  }, [circularMotion, dragState.isDragging, dragState.dragOffset, threshold, radius]);

  const circularTransform = getCircularTransform();

  return {
    dragState,
    mouseEvents,
    touchEvents,
    isDragging: dragState.isDragging,
    dragOffset: dragState.dragOffset,
    circularTransform,
    getTransformStyle: () => {
      if (circularMotion) {
        return {
          transform: `translate(${circularTransform.x}px, ${-circularTransform.y}px) rotate(${circularTransform.rotation}deg)`,
          transformOrigin: 'center bottom'
        };
      }
      return {
        transform: `translateX(${dragState.dragOffset}px)`
      };
    }
  };
};