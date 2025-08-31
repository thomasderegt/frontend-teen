'use client';

import { Heading as ChakraHeading } from '@chakra-ui/react';

interface HeadingProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  mb?: number;
}

export default function Heading({ 
  children, 
  size = 'lg',
  color = 'white',
  textAlign = 'center',
  mb = 4
}: HeadingProps) {
  return (
    <ChakraHeading
      size={size}
      color={color}
      textAlign={textAlign}
      mb={mb}
    >
      {children}
    </ChakraHeading>
  );
} 