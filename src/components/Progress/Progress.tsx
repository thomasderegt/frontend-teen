'use client';

import { Box } from '@chakra-ui/react';
import { colors, spacing, typography } from '@/tokens';

interface ProgressProps {
  value: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
}

export default function Progress({ 
  value, 
  size = 'md',
  variant = 'default',
  showLabel = false
}: ProgressProps) {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          height: '4px',
          fontSize: typography.fontSizes.xs
        };
      case 'md':
        return {
          height: '6px',
          fontSize: typography.fontSizes.sm
        };
      case 'lg':
        return {
          height: '8px',
          fontSize: typography.fontSizes.md
        };
      default:
        return {};
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          bg: colors.success[500],
          color: colors.success[700]
        };
      case 'warning':
        return {
          bg: colors.warning[500],
          color: colors.warning[700]
        };
      case 'error':
        return {
          bg: colors.error[500],
          color: colors.error[700]
        };
      default:
        return {
          bg: colors.primary[500],
          color: colors.primary[700]
        };
    }
  };

  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <Box>
      {showLabel && (
        <Box
          mb={spacing[2]}
          fontSize={getSizeStyles().fontSize}
          color={getVariantStyles().color}
          fontWeight={typography.fontWeights.medium}
        >
          {Math.round(clampedValue)}%
        </Box>
      )}
      
      <Box
        width="100%"
        bg={colors.gray[200]}
        borderRadius="full"
        overflow="hidden"
        {...getSizeStyles()}
      >
        <Box
          width={`${clampedValue}%`}
          height="100%"
          bg={getVariantStyles().bg}
          transition="width 0.3s ease"
          borderRadius="full"
        />
      </Box>
    </Box>
  );
} 