'use client';

import { useSession } from 'next-auth/react';
import HeaderNavPattern from '@/patterns/HeaderNav/HeaderNavPattern';

interface HeaderAuthWrapperProps {
  children: React.ReactNode;
}

export default function HeaderAuthWrapper({ children }: HeaderAuthWrapperProps) {
  const { data: session, status } = useSession();

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

  // Actions for guest users
  const guestActions = [
    {
      id: 'notifications',
      icon: '🔔',
      badge: 0
    },
    {
      id: 'settings',
      icon: '⚙️',
      href: '/settings'
    },
    {
      id: 'login',
      icon: '👤',
      href: '/auth/signin'
    }
  ];

  // Actions for authenticated users
  const authActions = [
    {
      id: 'notifications',
      icon: '🔔',
      badge: 3
    },
    {
      id: 'settings',
      icon: '⚙️',
      href: '/settings'
    }
  ];

  const isAuthenticated = status === 'authenticated';
  const actions = isAuthenticated ? authActions : guestActions;
  const userName = isAuthenticated ? session?.user?.name || 'Gebruiker' : 'Gast';
  const userAvatar = undefined;

  return (
    <>
      <HeaderNavPattern
        logoTitle="Wheel of Islam"
        logoSubtitle="Learn & Grow"
        navItems={navItems}
        actions={actions}
        userAvatar={userAvatar}
        userName={userName}
      />
      {children}
    </>
  );
} 