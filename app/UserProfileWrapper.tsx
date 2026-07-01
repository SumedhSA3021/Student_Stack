'use client';

import { ReactNode } from 'react';
import { UserProfileProvider, useUserProfile } from '@/lib/UserProfileContext';
import { OnboardingForm } from '@/components/OnboardingForm';
import { ThemeProvider } from 'next-themes';

function OnboardingGate({ children }: { children: ReactNode }) {
  const { isOnboarded } = useUserProfile();

  if (!isOnboarded) {
    return <OnboardingForm />;
  }

  return <>{children}</>;
}

export function UserProfileWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <UserProfileProvider>
        <OnboardingGate>{children}</OnboardingGate>
      </UserProfileProvider>
    </ThemeProvider>
  );
}
