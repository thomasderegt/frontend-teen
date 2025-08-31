'use client';

import { Image as ChakraImage, Box } from '@chakra-ui/react';
import { colors, spacing } from '@/tokens';

interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
  cursor?: string;
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
}

export default function Image({ 
  src, 
  alt, 
  width = 'auto',
  height = 'auto',
  borderRadius = 'md',
  objectFit = 'cover',
  fallbackSrc,
  loading = 'lazy',
  onClick,
  cursor = 'default',
  shadow = 'none'
}: ImageProps) {
  const getShadowStyles = () => {
    switch (shadow) {
      case 'sm':
        return { boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' };
      case 'md':
        return { boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' };
      case 'lg':
        return { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' };
      case 'xl':
        return { boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' };
      case '2xl':
        return { boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' };
      case 'none':
      default:
        return {};
    }
  };

  return (
    <Box
      onClick={onClick}
      cursor={onClick ? 'pointer' : cursor}
      transition="all 0.2s"
      _hover={onClick ? { transform: 'scale(1.02)' } : {}}
    >
      <ChakraImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        borderRadius={borderRadius}
        objectFit={objectFit}
        fallbackSrc={fallbackSrc}
        loading={loading}
        {...getShadowStyles()}
      />
    </Box>
  );
} 