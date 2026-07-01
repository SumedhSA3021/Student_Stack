'use client';

import { ReactNode } from 'react';
import { UserProfileProvider, useUserProfile } from '@/lib/UserProfileContext';
import { OnboardingForm } from '@/components/OnboardingForm';
import { ThemeProvider } from 'next-themes';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { LoginScreen } from '@/components/LoginScreen';
import { SessionProvider } from 'next-auth/react';

function OnboardingGate({ children }: { children: ReactNode }) {
  const { isOnboarded } = useUserProfile();

  if (!isOnboarded) {
    return <OnboardingForm />;
  }

  return <>{children}</>;
}

function AuthGate({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-500 animate-pulse" />
          <div className="h-2 w-32 rounded-full bg-zinc-800 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return <>{children}</>;
}

export function UserProfileWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <AuthProvider>
          <UserProfileProvider>
            <AuthGate>
              <OnboardingGate>{children}</OnboardingGate>
            </AuthGate>
          </UserProfileProvider>
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
