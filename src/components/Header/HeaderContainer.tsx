'use client';

import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface HeaderContainerProps {
  children: ReactNode;
  className?: string;
  isSticky?: boolean;
  isTransparent?: boolean;
}

export default function HeaderContainer({
  children,
  className,
  isSticky = true,
  isTransparent = false
}: HeaderContainerProps) {
  return (
    <Box
      as="header"
      position={isSticky ? 'sticky' : 'relative'}
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={isTransparent ? 'transparent' : 'white'}
      borderBottom={isTransparent ? 'none' : '1px solid'}
      borderColor="gray.200"
      boxShadow={isTransparent ? 'none' : 'sm'}
      className={className}
    >
      <Box
        maxW="1200px"
        mx="auto"
        px={4}
        py={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        minH="64px"
      >
        {children}
      </Box>
    </Box>
  );
} 