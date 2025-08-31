'use client';

import { ReactNode } from 'react';
import { Box, useTheme } from '@chakra-ui/react';
import { createScaledSVGPath, polarPoint, pathTransitionStyles, ScaledDimensions, getSegmentTransform } from '@/utils/svgScaling';

interface SVGWheelSegmentProps {
  children: ReactNode;
  position: number;
  totalItems: number;
  size?: 'sm' | 'md' | 'lg';
  isFocused?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: 'circle' | 'donut';
  radius?: number;
  donutInnerRadius?: number;
  donutOuterRadius?: number;
  containerSize?: number;
  centerX?: number;
  centerY?: number;
  scaledDimensions?: ScaledDimensions;
  segmentScale?: number;
}

export default function SVGWheelSegment({
  children,
  position,
  totalItems,
  size = 'md',
  isFocused = false,
  isSelected = false,
  onClick,
  className,
  variant = 'circle',
  radius,
  donutInnerRadius,
  donutOuterRadius,
  containerSize: propContainerSize,
  centerX: propCenterX,
  centerY: propCenterY,
  scaledDimensions,
  segmentScale = 1
}: SVGWheelSegmentProps) {
  
  console.log(`SVGWheelSegment ${position}: onClick exists:`, !!onClick);
  const theme = useTheme();
  const containerSize = propContainerSize || 600;
  const centerX = propCenterX || containerSize / 2;
  const centerY = propCenterY || containerSize / 2;

  // Use scaled dimensions if available, otherwise fallback to old calculation
  let innerRadius: number, outerRadius: number, itemSize: number, strokeWidth: number, gapWidth: number;

  if (scaledDimensions) {
    innerRadius = scaledDimensions.innerRadius;
    outerRadius = scaledDimensions.outerRadius;
    itemSize = scaledDimensions.textScale.itemSize;
    strokeWidth = scaledDimensions.strokeWidth;
    gapWidth = scaledDimensions.gapWidth;
  } else {
    // Fallback to old calculation
    const baseRadius = radius || (size === 'sm' ? 120 : size === 'lg' ? 200 : 160);
    innerRadius = donutInnerRadius || baseRadius * 0.3;
    outerRadius = donutOuterRadius || baseRadius * 0.8;
    itemSize = size === 'sm' ? 60 : size === 'lg' ? 100 : 80;
    strokeWidth = 2;
    gapWidth = 1;
  }

  const segmentAngle = (2 * Math.PI) / totalItems;
  const currentSegmentStart = position * segmentAngle;
  const currentSegmentEnd = (position + 1) * segmentAngle;

  // Create the SVG path for this segment
  const d = createScaledSVGPath(
    centerX,
    centerY,
    innerRadius,
    outerRadius,
    currentSegmentStart,
    currentSegmentEnd,
    gapWidth
  );

  // Calculate position for text/icon
  const midAngle = currentSegmentStart + (currentSegmentEnd - currentSegmentStart) / 2;
  const midRadius = (innerRadius + outerRadius) / 2 + 15; // Move text further out in segments
  const [tx, ty] = polarPoint(centerX, centerY, midRadius, midAngle);
  const textRotation = (midAngle * 180) / Math.PI + 90;

  const getFillColor = () => {
    // Pastel regenboog gradient kleuren in volgorde
    const rainbowGradient = [
      '#FFB3B3', // Pastel rood
      '#FFB366', // Pastel oranje-rood
      '#FFCC80', // Pastel oranje
      '#FFD966', // Pastel oranje-geel
      '#FFFFB3', // Pastel geel
      '#D4FF80', // Pastel geel-groen
      '#B3FFB3', // Pastel groen
      '#B3FFFF', // Pastel groen-blauw
      '#B3B3FF', // Pastel blauw
      '#CCB3FF', // Pastel indigo
      '#E6B3FF', // Pastel violet
      '#FFB3E6'  // Pastel roze
    ];
    
    if (isSelected) return theme.colors.accent.green;
    
    // Bereken de exacte positie in de gradient
    const totalSegments = 10; // Aantal segmenten in de wheel
    const gradientIndex = (position / totalSegments) * (rainbowGradient.length - 1);
    const colorIndex = Math.floor(gradientIndex);
    const nextColorIndex = Math.min(colorIndex + 1, rainbowGradient.length - 1);
    const fraction = gradientIndex - colorIndex;
    
    // Interpoleer tussen twee kleuren voor smooth gradient
    const color1 = rainbowGradient[colorIndex];
    const color2 = rainbowGradient[nextColorIndex];
    
    if (isFocused) {
      return color1; // Gebruik de hoofdkleur voor focused state
    }
    
    return color1; // Gebruik de hoofdkleur voor normale state
  };

  const stroke = isSelected 
    ? theme.colors.accent.green 
    : isFocused 
    ? theme.colors.border.accent 
    : theme.colors.border.primary;

  // Calculate segment transform for individual scaling
  const segmentTransform = getSegmentTransform(centerX, centerY, segmentScale, midAngle);

  return (
    <g transform={segmentTransform}>
      <path
        d={d}
        fill={getFillColor()}
        stroke={stroke}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
        role="button"
        tabIndex={0}
        aria-label={`Radial item ${position + 1}`}
        onClick={(e) => {
          console.log('=== SVGWheelSegment: Path clicked ===');
          console.log('Position:', position);
          console.log('onClick function exists:', !!onClick);
          e.stopPropagation();
          if (onClick) {
            onClick();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        style={{
          cursor: 'pointer',
          pointerEvents: 'auto',
          opacity: 1,
          ...pathTransitionStyles
        }}
        onMouseEnter={(e) => {
          console.log('Mouse enter on segment:', position);
          console.log('Event target:', e.currentTarget);
          if (onClick) {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.fill = '#ff0000'; // Rood voor test
          }
        }}
        onMouseLeave={(e) => {
          console.log('Mouse leave on segment:', position);
          if (onClick) {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.fill = getFillColor();
          }
        }}
        onMouseDown={(e) => {
          console.log('Mouse down on segment:', position);
        }}
        onMouseUp={(e) => {
          console.log('Mouse up on segment:', position);
        }}
      />
      <foreignObject
        x={tx - itemSize / 2}
        y={ty - itemSize / 2}
        width={itemSize}
        height={itemSize}
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
          transform={`rotate(${textRotation}deg)`}
          transformOrigin="center"
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