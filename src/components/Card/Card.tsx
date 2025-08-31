'use client';

import { Box } from '@chakra-ui/react';
import { colors, spacing } from '@/tokens';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({ 
  children, 
  variant = 'default',
  padding = 'md'
}: CardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return {
          bg: 'white',
          border: `1px solid ${colors.gray[200]}`,
          boxShadow: 'sm'
        };
      case 'elevated':
        return {
          bg: 'white',
          boxShadow: 'lg',
          border: 'none'
        };
      case 'outlined':
        return {
          bg: 'transparent',
          border: `2px solid ${colors.gray[300]}`,
          boxShadow: 'none'
        };
      default:
        return {};
    }
  };

  const getPaddingStyles = () => {
    switch (padding) {
      case 'sm':
        return { p: spacing[3] };
      case 'md':
        return { p: spacing[4] };
      case 'lg':
        return { p: spacing[6] };
      default:
        return {};
    }
  };

  return (
    <Box
      borderRadius="lg"
      transition="all 0.2s"
      {...getVariantStyles()}
      {...getPaddingStyles()}
    >
      {children}
    </Box>
  );
} 