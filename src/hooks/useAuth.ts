import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      
      if (result?.error) {
        throw new Error(result.error);
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const requireAuth = (redirectTo = '/auth/signin') => {
    if (status === 'loading') return null;
    if (status === 'unauthenticated') {
      router.push(redirectTo);
      return null;
    }
    return session;
  };

  return {
    session,
    status,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    login,
    logout,
    requireAuth,
  };
} 