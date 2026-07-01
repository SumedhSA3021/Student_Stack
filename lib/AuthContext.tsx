'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react';

export interface AuthUser {
  name: string;
  email: string;
  avatarUrl?: string;
  provider: 'github' | 'google' | 'credentials' | 'test';
  loginAt: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  activeConsent: 'github' | 'google' | null;
  startSignIn: (provider: 'github' | 'google') => void;
  completeSignIn: (user: AuthUser) => void;
  cancelSignIn: () => void;
  signInWithTest: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  const user: AuthUser | null = session?.user
    ? {
        name: session.user.name || '',
        email: session.user.email || '',
        avatarUrl: session.user.image || '',
        provider: ((session.user as any).provider || 'credentials') as any,
        loginAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      }
    : null;

  const startSignIn = (provider: 'github' | 'google') => {
    // NextAuth triggers standard server-side redirects to provider logins
    nextAuthSignIn(provider);
  };

  const completeSignIn = (authUser: AuthUser) => {
    // Deprecated for NextAuth since login is server-guided
  };

  const cancelSignIn = () => {
    // Deprecated for NextAuth since redirects happen externally
  };

  const signInWithTest = () => {
    // Triggers CredentialsProvider login on the backend API route
    nextAuthSignIn('credentials', { callbackUrl: '/' });
  };

  const signOut = () => {
    nextAuthSignOut({ callbackUrl: '/' });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        activeConsent: null, // NextAuth handles consent screens on third-party redirects
        startSignIn,
        completeSignIn,
        cancelSignIn,
        signInWithTest,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
