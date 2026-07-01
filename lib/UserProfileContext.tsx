'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProfile {
  name: string;
  mobile: string;
  email: string;
  institutionName: string;
  institutionCity: string;
  institutionState: string;
  year: string;
  branch: string;
  bio: string;
}

interface UserProfileContextType {
  profile: UserProfile | null;
  isOnboarded: boolean;
  saveProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
}

const STORAGE_KEY = 'studentstack_user_profile';

const UserProfileContext = createContext<UserProfileContextType | null>(null);

function loadProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore parsing errors
  }
  return null;
}

function persistProfile(profile: UserProfile | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (profile) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setHydrated(true);
  }, []);

  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    persistProfile(newProfile);
  };

  const clearProfile = () => {
    setProfile(null);
    persistProfile(null);
  };

  // Prevent hydration mismatch — show loading skeleton until client-side hydration
  if (!hydrated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-500 animate-pulse" />
          <div className="h-2 w-32 rounded-full bg-zinc-800 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        isOnboarded: profile !== null,
        saveProfile,
        clearProfile,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
}
