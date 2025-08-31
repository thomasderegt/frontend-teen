'use client';

import { useRouter } from 'next/navigation';
import { Box, useToast } from '@chakra-ui/react';
import {
  HeaderContainer,
  HeaderLogo,
  HeaderNav,
  HeaderActions,
  HeaderMobileMenu
} from '@/components/Header';

interface NavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  icon?: string;
}

interface ActionItem {
  id: string;
  icon: string;
  href?: string;
  onClick?: () => void;
  badge?: number;
  isActive?: boolean;
}

interface HeaderNavPatternProps {
  // Logo props
  logoTitle?: string;
  logoSubtitle?: string;
  logoUrl?: string;
  onLogoClick?: () => void;
  
  // Navigation props
  navItems: NavItem[];
  
  // Actions props
  actions: ActionItem[];
  userAvatar?: string;
  userName?: string;
  onUserClick?: () => void;
  
  // Container props
  isSticky?: boolean;
  isTransparent?: boolean;
  className?: string;
}

export default function HeaderNavPattern({
  logoTitle = 'Wheel of Islam',
  logoSubtitle = 'Insight. Knowledge. Growth',
  logoUrl,
  onLogoClick,
  navItems,
  actions,
  userAvatar,
  userName,
  onUserClick,
  isSticky = true,
  isTransparent = false,
  className
}: HeaderNavPatternProps) {
  const router = useRouter();
  const toast = useToast();

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      // Default navigation to home
      router.push('/');
    }
  };

  const handleNavItemClick = (item: NavItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      router.push(item.href);
    }
  };

  const handleActionClick = (action: ActionItem) => {
    if (action.onClick) {
      action.onClick();
    } else if (action.href) {
      router.push(action.href);
    } else {
      // Default action handling
      toast({
        title: action.id,
        description: `${action.id} action triggered`,
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleUserClick = () => {
    if (onUserClick) {
      onUserClick();
    } else {
      // Default user action
      router.push('/profile');
    }
  };

  return (
    <HeaderContainer
      isSticky={isSticky}
      isTransparent={isTransparent}
      className={className}
    >
      {/* Left: Logo */}
      <HeaderLogo
        title={logoTitle}
        subtitle={logoSubtitle}
        logoUrl={logoUrl}
        onClick={handleLogoClick}
      />

      {/* Center: Navigation */}
      <HeaderNav
        items={navItems.map(item => ({
          ...item,
          onClick: () => handleNavItemClick(item)
        }))}
      />

      {/* Right: Actions and Mobile Menu */}
      <Box display="flex" alignItems="center" gap={2}>
        <HeaderActions
          actions={actions}
          userAvatar={userAvatar}
          userName={userName}
          onUserClick={handleUserClick}
        />
        
        <HeaderMobileMenu
          navItems={navItems.map(item => ({
            ...item,
            onClick: () => handleNavItemClick(item)
          }))}
        />
      </Box>
    </HeaderContainer>
  );
} 