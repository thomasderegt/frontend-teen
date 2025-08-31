'use client';

import { Box, Text, Image } from '@chakra-ui/react';

interface HeaderLogoProps {
  title?: string;
  subtitle?: string;
  logoUrl?: string;
  onClick?: () => void;
  className?: string;
}

export default function HeaderLogo({
  title = 'Wheel of Islam',
  subtitle = 'Insight. Knowledge. Growth',
  logoUrl,
  onClick,
  className
}: HeaderLogoProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={3}
      cursor={onClick ? 'pointer' : 'default'}
      onClick={onClick}
      className={className}
      _hover={onClick ? {
        opacity: 0.8,
        transform: 'scale(1.02)'
      } : undefined}
      transition="all 0.2s"
    >
      {/* Logo Image - Hidden for now */}
      {/* {logoUrl && (
        <Image
          src={logoUrl}
          alt={title}
          height="40px"
          width="40px"
          objectFit="contain"
        />
      )} */}
      
      {/* Text Content */}
      <Box>
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="primary.700"
          lineHeight="1.2"
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            fontSize="xs"
            color="gray.600"
            lineHeight="1.2"
          >
            {subtitle}
          </Text>
        )}
      </Box>
    </Box>
  );
} 