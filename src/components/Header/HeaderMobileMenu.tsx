'use client';

import { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Drawer, 
  DrawerBody, 
  DrawerHeader, 
  DrawerOverlay, 
  DrawerContent, 
  DrawerCloseButton,
  VStack,
  Text,
  Divider,
  useMediaQuery
} from '@chakra-ui/react';

interface MobileNavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  icon?: string;
}

interface HeaderMobileMenuProps {
  navItems: MobileNavItem[];
  onClose?: () => void;
  className?: string;
}

export default function HeaderMobileMenu({
  navItems,
  onClose,
  className
}: HeaderMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleItemClick = (item: MobileNavItem) => {
    if (item.onClick) {
      item.onClick();
    }
    handleClose();
  };

  // Only show on mobile
  if (!isMobile) {
    return null;
  }

  return (
    <>
      <IconButton
        aria-label="Open menu"
        icon={<span>☰</span>}
        size="md"
        variant="ghost"
        colorScheme="gray"
        onClick={handleOpen}
        className={className}
        _hover={{
          bg: 'gray.100',
          transform: 'scale(1.05)'
        }}
        transition="all 0.2s"
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={handleClose}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Menu
          </DrawerHeader>

          <DrawerBody p={0}>
            <VStack spacing={0} align="stretch">
              {navItems.map((item, index) => (
                <Box key={item.id}>
                  {item.href ? (
                    <Box
                      as="a"
                      href={item.href}
                      onClick={() => handleItemClick(item)}
                      w="100%"
                      p={4}
                      textAlign="left"
                      cursor={item.isDisabled ? 'not-allowed' : 'pointer'}
                      opacity={item.isDisabled ? 0.5 : 1}
                      pointerEvents={item.isDisabled ? 'none' : 'auto'}
                      bg={item.isActive ? 'primary.50' : 'transparent'}
                      borderLeft={item.isActive ? '4px solid' : 'none'}
                      borderColor="primary.500"
                      _hover={!item.isDisabled ? {
                        bg: 'gray.50'
                      } : undefined}
                      transition="all 0.2s"
                    >
                      <Box display="flex" alignItems="center" gap={3}>
                        {item.icon && (
                          <Text fontSize="lg">{item.icon}</Text>
                        )}
                        <Text
                          fontSize="md"
                          fontWeight={item.isActive ? 'semibold' : 'medium'}
                          color={item.isActive ? 'primary.600' : 'gray.700'}
                        >
                          {item.label}
                        </Text>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      as="button"
                      onClick={() => handleItemClick(item)}
                      w="100%"
                      p={4}
                      textAlign="left"
                      cursor={item.isDisabled ? 'not-allowed' : 'pointer'}
                      opacity={item.isDisabled ? 0.5 : 1}
                      pointerEvents={item.isDisabled ? 'none' : 'auto'}
                      bg={item.isActive ? 'primary.50' : 'transparent'}
                      borderLeft={item.isActive ? '4px solid' : 'none'}
                      borderColor="primary.500"
                      _hover={!item.isDisabled ? {
                        bg: 'gray.50'
                      } : undefined}
                      transition="all 0.2s"
                    >
                      <Box display="flex" alignItems="center" gap={3}>
                        {item.icon && (
                          <Text fontSize="lg">{item.icon}</Text>
                        )}
                        <Text
                          fontSize="md"
                          fontWeight={item.isActive ? 'semibold' : 'medium'}
                          color={item.isActive ? 'primary.600' : 'gray.700'}
                        >
                          {item.label}
                        </Text>
                      </Box>
                    </Box>
                  )}
                  {index < navItems.length - 1 && (
                    <Divider />
                  )}
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
} 