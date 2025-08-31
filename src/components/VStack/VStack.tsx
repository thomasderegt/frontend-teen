'use client';

import { VStack as ChakraVStack } from '@chakra-ui/react';

interface VStackProps {
  children: React.ReactNode;
  spacing?: number;
  align?: 'stretch' | 'center' | 'flex-start' | 'flex-end';
  mb?: number;
}

export default function VStack({ 
  children, 
  spacing = 4,
  align = 'stretch',
  mb = 0
}: VStackProps) {
  return (
    <ChakraVStack
      spacing={spacing}
      align={align}
      mb={mb}
    >
      {children}
    </ChakraVStack>
  );
} 