'use client';

import { ReactNode } from 'react';
import { Box, useTheme } from '@chakra-ui/react';
import { ScaledDimensions } from '@/utils/svgScaling';

interface SVGWheelCenterProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  isFocused?: boolean;
  onClick?: () => void;
  className?: string;
  isMobile?: boolean;
  isTablet?: boolean;
  containerSize?: number;
  variant?: 'circle' | 'donut';
  scaledDimensions?: ScaledDimensions;
}

export default function SVGWheelCenter({
  children,
  size = 'md',
  isFocused = false,
  onClick,
  className,
  isMobile: propIsMobile,
  isTablet: propIsTablet,
  containerSize: propContainerSize,
  variant = 'circle',
  scaledDimensions
}: SVGWheelCenterProps) {
  const theme = useTheme();
  const containerSize = propContainerSize || 600;

  const getCenterSize = () => {
    if (scaledDimensions) {
      // Use scaled dimensions for consistent sizing, but make it smaller
      return (scaledDimensions.innerRadius * 2) * 0.6; // 60% van de originele grootte
    }
    
    // Fallback to old calculation, but smaller
    const baseSize = size === 'sm' ? 48 : size === 'lg' ? 72 : 60; // Kleinere base sizes
    const mobileScale = propIsMobile ? 0.8 : propIsTablet ? 0.9 : 1;
    return baseSize * mobileScale;
  };

  const centerSize = getCenterSize();
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;

  if (variant === 'donut') {
    // SVG-based center for donut variant
    const fillColor = isFocused ? theme.colors.accent.green : theme.colors.background.card;
    const strokeColor = isFocused ? theme.colors.accent.green : theme.colors.border.primary;

    return (
      <g>
        <circle
          cx={centerX}
          cy={centerY}
          r={centerSize / 2}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={2}
          role="button"
          tabIndex={0}
          aria-label="Center button"
          onClick={onClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick?.();
            }
          }}
          style={{
            cursor: onClick ? 'pointer' : 'default',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (onClick) {
              e.currentTarget.style.fill = theme.colors.accent.green;
              e.currentTarget.style.stroke = theme.colors.accent.green;
            }
          }}
          onMouseLeave={(e) => {
            if (onClick) {
              e.currentTarget.style.fill = fillColor;
              e.currentTarget.style.stroke = strokeColor;
            }
          }}
        />
        <foreignObject
          x={centerX - centerSize / 2}
          y={centerY - centerSize / 2}
          width={centerSize}
          height={centerSize}
          style={{ pointerEvents: 'none' }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
            textAlign="center"
            style={{
              fontSize: scaledDimensions?.textScale.fontSize || '14px'
            }}
          >
            {children}
          </Box>
        </foreignObject>
      </g>
    );
  }

  // Chakra Box-based center for circle variant
  return (
    <Box
      as={onClick ? 'button' : 'div'}
      onClick={onClick}
      position="absolute"
      top={`50%`}
      left={`50%`}
      transform="translate(-50%, -50%)"
      width={`${centerSize}px`}
      height={`${centerSize}px`}
      borderRadius="50%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor={onClick ? 'pointer' : 'default'}
      transition="all 0.3s ease"
      zIndex={10}
      className={className}
      bg={isFocused ? theme.colors.accent.green : theme.colors.background.card}
      border={`2px solid ${isFocused ? theme.colors.accent.green : theme.colors.border.primary}`}
      _hover={
        onClick
          ? {
              transform: 'translate(-50%, -50%) scale(1.05)',
              boxShadow: 'lg',
              bg: theme.colors.accent.green,
              borderColor: theme.colors.accent.green
            }
          : undefined
      }
      _focus={
        onClick
          ? {
              outline: 'none',
              ring: 2,
              ringColor: theme.colors.accent.green,
              ringOffset: 2
            }
          : undefined
      }
      style={{
        fontSize: scaledDimensions?.textScale.fontSize || '14px'
      }}
    >
      {children}
    </Box>
  );
} 