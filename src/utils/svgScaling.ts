import { useState, useEffect } from 'react';

export interface SVGScalingConfig {
  containerSize: number;
  baseSize: number; // Reference size (e.g., 600px)
  scaleFactor: number;
  variant: 'circle' | 'donut';
  screenSize?: number;
}

export interface SVGShapePart {
  type: 'center' | 'segment' | 'connector' | 'label';
  baseSize: number;
  scaleRatio: number;
  position: {
    angle: number;
    radius: number;
  };
}

export interface ResponsiveScaleConfig {
  scale: number;
  maxSize: number;
  innerRatio: number;
  outerRatio: number;
  strokeWidth: number; // Constant stroke width in px
  gapWidth: number; // Constant gap width in px
}

export interface ScaledDimensions {
  innerRadius: number;
  outerRadius: number;
  scaleFactor: number;
  centerX: number;
  centerY: number;
  strokeWidth: number; // Constant stroke width
  gapWidth: number; // Constant gap width
  viewBox: string; // SVG viewBox for scaling
  textScale: {
    fontSize: number;
    itemSize: number;
    iconSize: number;
  };
}

// Responsive breakpoints for SVG scaling with constant stroke/gap widths
const getSVGResponsiveScale = (screenSize: number, variant: string): ResponsiveScaleConfig => {
  const baseScales = {
    '2560': { 
      scale: 1.2, 
      maxSize: 800, 
      innerRatio: 0.12, 
      outerRatio: 0.48,
      strokeWidth: 3, // Constant stroke width
      gapWidth: 2     // Constant gap width
    },
    '1920': { 
      scale: 1.0, 
      maxSize: 600, 
      innerRatio: 0.15, 
      outerRatio: 0.45,
      strokeWidth: 2,
      gapWidth: 1.5
    },
    '1366': { 
      scale: 0.9, 
      maxSize: 500, 
      innerRatio: 0.18, 
      outerRatio: 0.42,
      strokeWidth: 2,
      gapWidth: 1.5
    },
    '1024': { 
      scale: 0.8, 
      maxSize: 400, 
      innerRatio: 0.20, 
      outerRatio: 0.40,
      strokeWidth: 1.5,
      gapWidth: 1
    },
    '768':  { 
      scale: 0.7, 
      maxSize: 350, 
      innerRatio: 0.22, 
      outerRatio: 0.38,
      strokeWidth: 1.5,
      gapWidth: 1
    },
    'default': { 
      scale: 0.6, 
      maxSize: 300, 
      innerRatio: 0.25, 
      outerRatio: 0.35,
      strokeWidth: 1,
      gapWidth: 0.5
    }
  };
  
  // Determine which scale to use
  let scaleConfig: ResponsiveScaleConfig;
  if (screenSize >= 2560) scaleConfig = baseScales['2560'];
  else if (screenSize >= 1920) scaleConfig = baseScales['1920'];
  else if (screenSize >= 1366) scaleConfig = baseScales['1366'];
  else if (screenSize >= 1024) scaleConfig = baseScales['1024'];
  else if (screenSize >= 768) scaleConfig = baseScales['768'];
  else scaleConfig = baseScales['default'];
  
  return {
    ...scaleConfig,
    // Adjust ratios for donut vs circle
    innerRatio: variant === 'donut' ? scaleConfig.innerRatio : 0,
    outerRatio: variant === 'donut' ? scaleConfig.outerRatio : scaleConfig.outerRatio
  };
};

// Calculate proportional SVG scaling with viewBox
export const calculateSVGScale = (config: SVGScalingConfig): ScaledDimensions => {
  const { containerSize, baseSize, variant, screenSize = 1920 } = config;
  const scaleFactor = containerSize / baseSize;
  
  // Get responsive scale configuration
  const responsiveScale = getSVGResponsiveScale(screenSize, variant);
  
  // Apply responsive scaling
  const adjustedScaleFactor = scaleFactor * responsiveScale.scale;
  
  // Calculate radii based on variant and responsive ratios
  const innerRadius = variant === 'donut' 
    ? containerSize * responsiveScale.innerRatio
    : 0; // No hole for circle
    
  const outerRadius = variant === 'donut'
    ? containerSize * responsiveScale.outerRatio
    : containerSize * 0.4; // 40% for circle
    
  // Calculate viewBox for proper scaling
  const viewBoxSize = Math.max(containerSize, 600); // Minimum viewBox size
  const viewBox = `0 0 ${viewBoxSize} ${viewBoxSize}`;
  
  // Calculate text scaling
  const textScale = calculateTextScale(containerSize, baseSize, adjustedScaleFactor);
  
  return {
    innerRadius,
    outerRadius,
    scaleFactor: adjustedScaleFactor,
    centerX: containerSize / 2,
    centerY: containerSize / 2,
    strokeWidth: responsiveScale.strokeWidth, // Constant stroke width
    gapWidth: responsiveScale.gapWidth,       // Constant gap width
    viewBox,
    textScale
  };
};

// Calculate text and content scaling
const calculateTextScale = (containerSize: number, baseSize: number, scaleFactor: number) => {
  return {
    fontSize: Math.max(12, Math.min(24, 16 * scaleFactor)), // Min 12px, max 24px
    itemSize: Math.max(40, Math.min(120, 80 * scaleFactor)), // Min 40px, max 120px
    iconSize: Math.max(16, Math.min(48, 32 * scaleFactor))   // Min 16px, max 48px
  };
};

// Create scaled SVG path for donut segments with gaps
export const createScaledSVGPath = (
  centerX: number,
  centerY: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
  gapWidth: number = 0 // Gap between segments
): string => {
  // Apply gap to segment angles
  const gapAngle = gapWidth / outerRadius; // Convert pixel gap to angle
  const adjustedStartAngle = startAngle + gapAngle / 2;
  const adjustedEndAngle = endAngle - gapAngle / 2;
  
  // Calculate path points
  const [sx, sy] = polarPoint(centerX, centerY, outerRadius, adjustedStartAngle);
  const [ex, ey] = polarPoint(centerX, centerY, outerRadius, adjustedEndAngle);
  const [isx, isy] = polarPoint(centerX, centerY, innerRadius, adjustedStartAngle);
  const [iex, iey] = polarPoint(centerX, centerY, innerRadius, adjustedEndAngle);
  
  const large = adjustedEndAngle - adjustedStartAngle > Math.PI ? 1 : 0;
  
  return [
    `M ${sx} ${sy}`,
    `A ${outerRadius} ${outerRadius} 0 ${large} 1 ${ex} ${ey}`,
    `L ${iex} ${iey}`,
    `A ${innerRadius} ${innerRadius} 0 ${large} 0 ${isx} ${isy}`,
    'Z',
  ].join(' ');
};

// Helper function to calculate polar coordinates
export const polarPoint = (cx: number, cy: number, r: number, a: number): [number, number] => {
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};

// Calculate individual segment scaling transform
export const getSegmentTransform = (
  centerX: number,
  centerY: number,
  segmentScale: number = 1,
  segmentAngle: number = 0
): string => {
  if (segmentScale === 1) return '';
  
  // Transform around center: translate to center, scale, translate back
  return `translate(${centerX}, ${centerY}) scale(${segmentScale}) translate(${-centerX}, ${-centerY})`;
};

// Transition styles for smooth scaling
export const svgTransitionStyles = {
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  willChange: 'transform, d, r, cx, cy'
};

export const pathTransitionStyles = {
  transition: 'd 0.3s ease, fill 0.2s ease, stroke 0.2s ease, transform 0.2s ease',
  willChange: 'd, fill, stroke, transform'
};

// Hook for getting current screen size - SSR safe
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(1920); // Default for SSR
  
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const updateScreenSize = () => {
      setScreenSize(window.innerWidth);
    };
    
    // Set initial size
    updateScreenSize();
    
    // Add event listener
    window.addEventListener('resize', updateScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);
  
  return screenSize;
}; 