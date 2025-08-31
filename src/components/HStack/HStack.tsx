'use client';

import { HStack as ChakraHStack } from '@chakra-ui/react';

interface HStackProps {
  children: React.ReactNode;
  spacing?: number;
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  mb?: number;
}

export default function HStack({ 
  children, 
  spacing = 4,
  justify = 'flex-start',
  mb = 0
}: HStackProps) {
  return (
    <ChakraHStack
      spacing={spacing}
      justify={justify}
      mb={mb}
    >
      {children}
    </ChakraHStack>
  );
} 