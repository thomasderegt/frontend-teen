'use client';

import { Textarea as ChakraTextarea, FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import { colors, spacing, typography } from '@/tokens';

interface TextareaProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
  resize?: 'horizontal' | 'vertical' | 'both' | 'none';
  rows?: number;
  maxLength?: number;
  minLength?: number;
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export default function Textarea({ 
  value = '',
  placeholder,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  readOnly = false,
  required = false,
  name,
  id,
  size = 'md',
  variant = 'outline',
  resize = 'vertical',
  rows = 4,
  maxLength,
  minLength,
  label,
  error,
  helperText,
  fullWidth = true
}: TextareaProps) {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          px: spacing[3],
          py: spacing[2],
          fontSize: typography.fontSizes.sm,
          minH: '80px'
        };
      case 'md':
        return {
          px: spacing[4],
          py: spacing[3],
          fontSize: typography.fontSizes.md,
          minH: '100px'
        };
      case 'lg':
        return {
          px: spacing[5],
          py: spacing[4],
          fontSize: typography.fontSizes.lg,
          minH: '120px'
        };
      default:
        return {};
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return {
          border: `1px solid ${colors.gray[300]}`,
          bg: 'white',
          _hover: { borderColor: colors.gray[400] },
          _focus: { 
            borderColor: colors.primary[500], 
            boxShadow: `0 0 0 1px ${colors.primary[500]}` 
          },
          _invalid: { borderColor: colors.error[500] }
        };
      case 'filled':
        return {
          border: '1px solid transparent',
          bg: colors.gray[100],
          _hover: { bg: colors.gray[200] },
          _focus: { 
            bg: 'white',
            borderColor: colors.primary[500],
            boxShadow: `0 0 0 1px ${colors.primary[500]}` 
          },
          _invalid: { borderColor: colors.error[500] }
        };
      case 'flushed':
        return {
          border: 'none',
          borderBottom: `2px solid ${colors.gray[300]}`,
          borderRadius: 0,
          px: 0,
          bg: 'transparent',
          _hover: { borderBottomColor: colors.gray[400] },
          _focus: { 
            borderBottomColor: colors.primary[500],
            boxShadow: 'none'
          },
          _invalid: { borderBottomColor: colors.error[500] }
        };
      case 'unstyled':
        return {
          border: 'none',
          bg: 'transparent',
          px: 0,
          _focus: { boxShadow: 'none' }
        };
      default:
        return {};
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const textareaElement = (
    <ChakraTextarea
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      name={name}
      id={id}
      resize={resize}
      rows={rows}
      maxLength={maxLength}
      minLength={minLength}
      width={fullWidth ? '100%' : 'auto'}
      borderRadius="md"
      transition="all 0.2s"
      _disabled={{
        opacity: 0.6,
        cursor: 'not-allowed'
      }}
      {...getSizeStyles()}
      {...getVariantStyles()}
    />
  );

  if (label || error || helperText) {
    return (
      <FormControl isInvalid={!!error} isRequired={required}>
        {label && <FormLabel>{label}</FormLabel>}
        {textareaElement}
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
        {helperText && !error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }

  return textareaElement;
} 