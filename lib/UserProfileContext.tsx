'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

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

const UserProfileContext = createContext<UserProfileContextType | null>(null);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setHydrated(true);
      return;
    }

    const STORAGE_KEY = `studentstack_user_profile_${user.email}`;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProfile(JSON.parse(stored));
      } else {
        setProfile(null);
      }
    } catch {
      setProfile(null);
    }
    setHydrated(true);
  }, [user]);

  const saveProfile = (newProfile: UserProfile) => {
    if (!user) return;
    setProfile(newProfile);
    const STORAGE_KEY = `studentstack_user_profile_${user.email}`;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    } catch (err) {
      console.error('Failed to save profile:', err);
    }
  };

  const clearProfile = () => {
    if (!user) return;
    setProfile(null);
    const STORAGE_KEY = `studentstack_user_profile_${user.email}`;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear profile:', err);
    }
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
