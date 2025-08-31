'use client';

import { Box as ChakraBox } from '@chakra-ui/react';

interface BoxProps {
  children: React.ReactNode;
  bg?: string;
  p?: number;
  borderRadius?: string;
  border?: string;
  borderColor?: string;
  mb?: number;
  opacity?: number;
  boxShadow?: string;
  minH?: string;
  display?: string;
  flexDirection?: string;
  position?: string;
  top?: number;
  right?: number;
  maxW?: string;
  mx?: string;
  _hover?: any;
  transition?: string;
}

export default function Box({ 
  children, 
  bg = 'transparent',
  p = 4,
  borderRadius = 'md',
  border,
  borderColor,
  mb = 4,
  opacity = 1,
  boxShadow,
  minH,
  display,
  flexDirection,
  position,
  top,
  right,
  maxW,
  mx,
  _hover,
  transition
}: BoxProps) {
  return (
    <ChakraBox
      bg={bg}
      p={p}
      borderRadius={borderRadius}
      border={border}
      borderColor={borderColor}
      mb={mb}
      opacity={opacity}
      boxShadow={boxShadow}
      minH={minH}
      display={display}
      flexDirection={flexDirection}
      position={position}
      top={top}
      right={right}
      maxW={maxW}
      mx={mx}
      _hover={_hover}
      transition={transition}
    >
      {children}
    </ChakraBox>
  );
} 