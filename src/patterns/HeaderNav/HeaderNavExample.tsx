'use client';

import { useRouter } from 'next/navigation';
import HeaderNavPattern from './HeaderNavPattern';

// Example 1: Basic Header Navigation
export function BasicHeaderExample() {
  const router = useRouter();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      isActive: true,
      icon: '🏠'
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/dashboard',
      icon: '📊'
    },
    {
      id: 'lessons',
      label: 'Lessons',
      href: '/lessons',
      icon: '📚'
    },
    {
      id: 'progress',
      label: 'Progress',
      href: '/progress',
      icon: '📈'
    }
  ];

  const actions = [
    {
      id: 'notifications',
      icon: '🔔',
      badge: 3
    },
    {
      id: 'settings',
      icon: '⚙️'
    }
  ];

  return (
    <HeaderNavPattern
      logoTitle="Wheel of Islam"
      logoSubtitle="Learn & Grow"
      navItems={navItems}
      actions={actions}
      userAvatar="/user-avatar.jpg"
      userName="Ahmed"
    />
  );
}

// Example 2: Header with Custom Actions
export function CustomActionsHeaderExample() {
  const navItems = [
    {
      id: 'hub',
      label: 'Hub',
      href: '/hub',
      isActive: true,
      icon: '🎯'
    },
    {
      id: 'spokes',
      label: 'Spokes',
      href: '/spokes',
      icon: '🔄'
    },
    {
      id: 'community',
      label: 'Community',
      href: '/community',
      icon: '👥'
    }
  ];

  const actions = [
    {
      id: 'search',
      icon: '🔍',
      onClick: () => console.log('Search clicked')
    },
    {
      id: 'notifications',
      icon: '🔔',
      badge: 5,
      onClick: () => console.log('Notifications clicked')
    },
    {
      id: 'help',
      icon: '❓',
      onClick: () => console.log('Help clicked')
    }
  ];

  return (
    <HeaderNavPattern
      logoTitle="Islamic Learning"
      logoSubtitle="Knowledge Hub"
      logoUrl="/islamic-logo.svg"
      navItems={navItems}
      actions={actions}
      userAvatar="/user-avatar.jpg"
      userName="Fatima"
      onUserClick={() => console.log('User profile clicked')}
    />
  );
}

// Example 3: Transparent Header for Hero Sections
export function TransparentHeaderExample() {
  const navItems = [
    {
      id: 'about',
      label: 'About',
      href: '/about',
      icon: 'ℹ️'
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '/contact',
      icon: '📧'
    }
  ];

  const actions = [
    {
      id: 'login',
      icon: '🔑',
      onClick: () => console.log('Login clicked')
    }
  ];

  return (
    <HeaderNavPattern
      logoTitle="Wheel of Islam"
      isTransparent={true}
      navItems={navItems}
      actions={actions}
    />
  );
}

// Example 4: Header with Disabled Items
export function DisabledItemsHeaderExample() {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      isActive: true,
      icon: '🏠'
    },
    {
      id: 'premium',
      label: 'Premium',
      href: '/premium',
      isDisabled: true,
      icon: '⭐'
    },
    {
      id: 'settings',
      label: 'Settings',
      href: '/settings',
      icon: '⚙️'
    }
  ];

  const actions = [
    {
      id: 'upgrade',
      icon: '💎',
      onClick: () => console.log('Upgrade clicked')
    }
  ];

  return (
    <HeaderNavPattern
      logoTitle="Learning App"
      navItems={navItems}
      actions={actions}
      userName="User"
    />
  );
} 