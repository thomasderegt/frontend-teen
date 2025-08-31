'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { calculateSVGScale, svgTransitionStyles, useScreenSize } from '@/utils/svgScaling';

interface SVGWheelContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'circle' | 'donut';
  showConnectingLines?: boolean;
  containerSize?: number;
  className?: string;
}

export default function SVGWheelContainer({
  children,
  size = 'md',
  variant = 'circle',
  showConnectingLines = true,
  containerSize = 600,
  className
}: SVGWheelContainerProps) {
  const screenSize = useScreenSize();
  const [mounted, setMounted] = useState(false);
  const [scaledDimensions, setScaledDimensions] = useState(() => 
    calculateSVGScale({
      containerSize,
      baseSize: 600,
      scaleFactor: containerSize / 600,
      variant,
      screenSize: 1920 // Default for SSR
    })
  );

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update scaling when container size or variant changes
  useEffect(() => {
    if (!mounted) return;
    
    const newDimensions = calculateSVGScale({
      containerSize,
      baseSize: 600,
      scaleFactor: containerSize / 600,
      variant,
      screenSize
    });
    setScaledDimensions(newDimensions);
  }, [containerSize, variant, screenSize, mounted]);

  // Don't render SVG until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <Box
        position="relative"
        width={`${containerSize}px`}
        height={`${containerSize}px`}
        maxWidth="100%"
        maxHeight="100%"
        className={className}
        style={{
          ...svgTransitionStyles,
          aspectRatio: '1 / 1' // Ensure square aspect ratio
        }}
      >
        {/* Placeholder while loading */}
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="gray.100"
          borderRadius="md"
        >
          Loading...
        </Box>
      </Box>
    );
  }

  return (
    <Box
      position="relative"
      width={`${containerSize}px`}
      height={`${containerSize}px`}
      maxWidth="100%"
      maxHeight="100%"
      className={className}
      style={{
        ...svgTransitionStyles,
        aspectRatio: '1 / 1', // Ensure square aspect ratio
        pointerEvents: 'auto'
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={scaledDimensions.viewBox}
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10,
          pointerEvents: 'auto',
          ...svgTransitionStyles
        }}
      >
        {/* Wheel segments will be rendered here with scaled dimensions */}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...child.props,
              scaledDimensions,
              variant,
              containerSize
            });
          }
          return child;
        })}
      </svg>
    </Box>
  );
} 