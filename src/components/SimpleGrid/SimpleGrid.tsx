'use client';

import { SimpleGrid as ChakraSimpleGrid } from '@chakra-ui/react';

interface SimpleGridProps {
  children: React.ReactNode;
  columns?: number | Record<string, number>;
  spacing?: number;
  mb?: number;
}

export default function SimpleGrid({ 
  children, 
  columns = { base: 1, md: 2, lg: 3 },
  spacing = 4,
  mb = 6
}: SimpleGridProps) {
  return (
    <ChakraSimpleGrid
      columns={columns}
      spacing={spacing}
      mb={mb}
    >
      {children}
    </ChakraSimpleGrid>
  );
} 