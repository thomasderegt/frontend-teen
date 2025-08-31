'use client';

import { useState, useRef, useCallback } from 'react';
import { Box, Text as ChakraText, useToast, useMediaQuery } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import SVGWheelContainer from '@/components/Navigation/RadialMenu/SVGWheelContainer';
import SVGWheelSegment from '@/components/Navigation/RadialMenu/SVGWheelSegment';
import SVGWheelCenter from '@/components/Navigation/RadialMenu/SVGWheelCenter';

interface Center {
  id: string;
  title: string;
  description?: string;
  icon?: string;
}

interface Item {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  status?: 'completed' | 'in-progress' | 'locked' | 'available';
  progress?: number;
  phonetic?: string; // Arabic phonetic
}

interface SVGWheelMenuNavProps {
  center: Center;
  items: Item[];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'circle' | 'donut';
  showConnectingLines?: boolean;
  showCenter?: boolean;
  onCenterClick?: (center: Center) => void;
  onItemClick?: (item: Item, index: number) => void;
  containerSize?: number;
}

export default function SVGWheelMenuNav({
  center,
  items,
  size = 'md',
  variant = 'donut',
  showConnectingLines = true,
  showCenter = true,
  onCenterClick,
  onItemClick,
  containerSize = 600
}: SVGWheelMenuNavProps) {
  console.log('SVGWheelMenuNav containerSize:', containerSize);
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isCenterSelected, setIsCenterSelected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const router = useRouter();
  
  // Media queries for responsive behavior
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isTablet] = useMediaQuery('(max-width: 1024px)');

  const handleCenterClick = useCallback(() => {
    console.log('Center clicked:', center);
    setIsCenterSelected(true);
    setSelectedItemId(null);
    onCenterClick?.(center);
    
    toast({
      title: center.title,
      description: center.description || 'Center selected',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  }, [center, onCenterClick, toast]);

  const handleItemClick = useCallback((item: Item, index: number) => {
    console.log('=== SVGWheelMenuNav: Item clicked ===');
    console.log('Item:', item);
    console.log('Index:', index);
    console.log('onItemClick function exists:', !!onItemClick);
    
    setSelectedItemId(item.id);
    setIsCenterSelected(false);
    
    if (onItemClick) {
      console.log('Calling onItemClick...');
      onItemClick(item, index);
    } else {
      console.log('❌ onItemClick is not defined!');
    }
    
    toast({
      title: item.title,
      description: item.description || `${item.title} selected`,
      status: item.status === 'completed' ? 'success' : 'info',
      duration: 2000,
      isClosable: true,
    });
  }, [onItemClick, toast]);

  const isCenterFocused = () => focusedItemId === center.id || isCenterSelected;
  const isItemFocused = (itemId: string) => focusedItemId === itemId;
  const isItemSelected = (itemId: string) => selectedItemId === itemId;

  return (
    <Box
      ref={containerRef}
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
      position="relative"
    >
      {/* SVG Wheel Layout */}
      <SVGWheelContainer 
        size={size} 
        variant={variant} 
        showConnectingLines={showConnectingLines}
        containerSize={containerSize}
      >
        {/* Center */}
        {showCenter && (
          <SVGWheelCenter
            size={size}
            isFocused={isCenterFocused()}
            onClick={handleCenterClick}
            variant={variant}
            containerSize={containerSize}
          >
            <Box textAlign="center">
              <ChakraText 
                fontSize="sm" 
                fontWeight="bold" 
                color="black"
              >
                {center.title}
              </ChakraText>
              {center.description && (
                <ChakraText 
                  fontSize="xs" 
                  color="black"
                  mt={1}
                >
                  {center.description}
                </ChakraText>
              )}
            </Box>
          </SVGWheelCenter>
        )}

        {/* Wheel Segments */}
        {items.map((item, index) => (
          <SVGWheelSegment
            key={item.id}
            position={index}
            totalItems={items.length}
            size={size}
            isFocused={isItemFocused(item.id)}
            isSelected={isItemSelected(item.id)}
            onClick={() => handleItemClick(item, index)}
            variant={variant}
            containerSize={containerSize}
          >
            <Box textAlign="center" px={1}>
              <ChakraText 
                fontSize="xs" 
                fontWeight="semibold" 
                color="black"
                lineHeight="1.2"
              >
                {item.title}
              </ChakraText>
              {item.phonetic && (
                <ChakraText 
                  fontSize="2xs" 
                  fontWeight="normal" 
                  color="gray.600"
                  lineHeight="1.1"
                  mt={0.5}
                >
                  {item.phonetic}
                </ChakraText>
              )}
            </Box>
          </SVGWheelSegment>
        ))}
      </SVGWheelContainer>
    </Box>
  );
}