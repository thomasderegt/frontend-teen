'use client';

import { Box, Text } from '@chakra-ui/react';
import { colors, spacing, typography } from '@/tokens';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  fullWidth = false
}: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          bg: colors.primary[500],
          color: 'white',
          _hover: { bg: colors.primary[600] },
          _active: { bg: colors.primary[700] }
        };
      case 'secondary':
        return {
          bg: colors.gray[100],
          color: colors.gray[800],
          _hover: { bg: colors.gray[200] },
          _active: { bg: colors.gray[300] }
        };
      case 'outline':
        return {
          bg: 'transparent',
          color: colors.primary[500],
          border: `2px solid ${colors.primary[500]}`,
          _hover: { bg: colors.primary[50] },
          _active: { bg: colors.primary[100] }
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          px: spacing[3],
          py: spacing[2],
          fontSize: typography.fontSizes.sm
        };
      case 'md':
        return {
          px: spacing[4],
          py: spacing[3],
          fontSize: typography.fontSizes.md
        };
      case 'lg':
        return {
          px: spacing[6],
          py: spacing[4],
          fontSize: typography.fontSizes.lg
        };
      default:
        return {};
    }
  };

  return (
    <Box
      as="button"
      onClick={onClick}
      disabled={disabled}
      width={fullWidth ? '100%' : 'auto'}
      borderRadius="md"
      fontWeight={typography.fontWeights.medium}
      transition="all 0.2s"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.6 : 1}
      _focus={{
        outline: 'none',
        ring: 2,
        ringColor: colors.primary[500],
        ringOffset: 2
      }}
      {...getVariantStyles()}
      {...getSizeStyles()}
    >
      <Text>{children}</Text>
    </Box>
  );
} 