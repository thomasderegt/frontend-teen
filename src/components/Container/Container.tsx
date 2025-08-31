'use client';

import { Container as ChakraContainer } from '@chakra-ui/react';

interface ContainerProps {
  children: React.ReactNode;
  maxW?: string;
  py?: number;
  px?: number;
}

export default function Container({ 
  children, 
  maxW = 'container.lg',
  py = 8,
  px = 4
}: ContainerProps) {
  return (
    <ChakraContainer
      maxW={maxW}
      py={py}
      px={px}
    >
      {children}
    </ChakraContainer>
  );
} 