'use client';

import { useState, useCallback } from 'react';

interface UseRadialNavigationProps {
  totalItems: number;
  onItemSelect?: (index: number) => void;
  onCenterSelect?: () => void;
}

export function useRadialNavigation({
  totalItems,
  onItemSelect,
  onCenterSelect
}: UseRadialNavigationProps) {
  const [focusedIndex, setFocusedIndex] = useState(0); // 0 = center, 1+ = items

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const totalElements = totalItems + 1; // +1 for center

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % totalElements);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + totalElements) % totalElements);
        break;
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setFocusedIndex(totalElements - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (focusedIndex === 0) {
          // Center selected
          onCenterSelect?.();
        } else {
          // Item selected
          const itemIndex = focusedIndex - 1;
          onItemSelect?.(itemIndex);
        }
        break;
    }
  }, [totalItems, focusedIndex, onItemSelect, onCenterSelect]);

  const focusItem = useCallback((index: number) => {
    setFocusedIndex(index + 1); // +1 because 0 is center
  }, []);

  const focusCenter = useCallback(() => {
    setFocusedIndex(0);
  }, []);

  const isCenterFocused = useCallback(() => {
    return focusedIndex === 0;
  }, [focusedIndex]);

  const isItemFocused = useCallback((index: number) => {
    return focusedIndex === index + 1;
  }, [focusedIndex]);

  return {
    focusedIndex,
    handleKeyDown,
    focusItem,
    focusCenter,
    isCenterFocused,
    isItemFocused
  };
} 