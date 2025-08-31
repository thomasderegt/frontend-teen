'use client';

import { Box, Text, useMediaQuery } from '@chakra-ui/react';

interface NavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

interface HeaderNavProps {
  items: NavItem[];
  className?: string;
}

export default function HeaderNav({
  items,
  className
}: HeaderNavProps) {
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  // Hide navigation on mobile - will be handled by mobile menu
  if (isMobile) {
    return null;
  }

  return (
    <Box
      as="nav"
      display="flex"
      alignItems="center"
      gap={6}
      className={className}
    >
      {items.map((item) => (
        <Box
          key={item.id}
          as={item.href ? 'a' : 'button'}
          href={item.href}
          onClick={item.onClick}
          cursor={item.isDisabled ? 'not-allowed' : 'pointer'}
          opacity={item.isDisabled ? 0.5 : 1}
          pointerEvents={item.isDisabled ? 'none' : 'auto'}
          _hover={!item.isDisabled ? {
            color: 'primary.600',
            transform: 'translateY(-1px)'
          } : undefined}
          transition="all 0.2s"
        >
          <Text
            fontSize="md"
            fontWeight={item.isActive ? 'semibold' : 'medium'}
            color={item.isActive ? 'primary.600' : 'gray.700'}
            borderBottom={item.isActive ? '2px solid' : 'none'}
            borderColor="primary.600"
            pb={1}
          >
            {item.label}
          </Text>
        </Box>
      ))}
    </Box>
  );
} 