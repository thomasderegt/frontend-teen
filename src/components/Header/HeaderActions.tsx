'use client';

import { useRouter } from 'next/navigation';
import { Box, IconButton, Avatar, Badge, useMediaQuery } from '@chakra-ui/react';

interface ActionItem {
  id: string;
  icon: string;
  onClick?: () => void;
  href?: string;
  badge?: number;
  isActive?: boolean;
}

interface HeaderActionsProps {
  actions: ActionItem[];
  userAvatar?: string;
  userName?: string;
  onUserClick?: () => void;
  className?: string;
}

export default function HeaderActions({
  actions,
  userAvatar,
  userName,
  onUserClick,
  className
}: HeaderActionsProps) {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const router = useRouter();

  const handleActionClick = (action: ActionItem) => {
    if (action.onClick) {
      action.onClick();
    } else if (action.href) {
      router.push(action.href);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={3}
      className={className}
    >
      {/* Action Buttons */}
      {actions.map((action) => (
        <Box key={action.id} position="relative">
          <IconButton
            aria-label={action.id}
            icon={<span>{action.icon}</span>}
            size="md"
            variant="ghost"
            colorScheme="gray"
            onClick={() => handleActionClick(action)}
            isActive={action.isActive}
            _hover={{
              bg: 'gray.100',
              transform: 'scale(1.05)'
            }}
            transition="all 0.2s"
          />
          {action.badge && action.badge > 0 && (
            <Badge
              position="absolute"
              top="-1"
              right="-1"
              colorScheme="red"
              borderRadius="full"
              fontSize="xs"
              minW="20px"
              h="20px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {action.badge > 99 ? '99+' : action.badge}
            </Badge>
          )}
        </Box>
      ))}

      {/* User Avatar */}
      {(userAvatar || userName) && (
        <Box
          cursor={onUserClick ? 'pointer' : 'default'}
          onClick={onUserClick}
          _hover={onUserClick ? {
            transform: 'scale(1.05)'
          } : undefined}
          transition="all 0.2s"
        >
          <Avatar
            size="sm"
            src={userAvatar}
            name={userName}
            bg="primary.500"
            color="white"
          />
        </Box>
      )}
    </Box>
  );
} 