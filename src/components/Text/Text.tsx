'use client';

import { Text as ChakraText } from '@chakra-ui/react';

interface TextProps {
  children: React.ReactNode;
  fontSize?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  mb?: number;
  fontStyle?: 'normal' | 'italic';
  lineHeight?: string;
}

export default function Text({ 
  children, 
  fontSize = 'md',
  color = 'white',
  textAlign = 'left',
  mb = 2,
  fontStyle = 'normal',
  lineHeight = '1.6'
}: TextProps) {
  return (
    <ChakraText
      fontSize={fontSize}
      color={color}
      textAlign={textAlign}
      mb={mb}
      fontStyle={fontStyle}
      lineHeight={lineHeight}
    >
      {children}
    </ChakraText>
  );
} 