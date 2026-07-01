'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Opportunity, Metrics, getMetrics, isClosingSoon } from './opportunities';

interface UserSettings {
  notifications: boolean;
  darkMode: boolean;
  digest: boolean;
  categories: string[];
}

interface AppState {
  opportunities: Opportunity[];
  claimedIds: Set<string>;
  bookmarkedIds: Set<string>;
  settings: UserSettings;
  isLoading: boolean;
  metrics: Metrics;
}

interface AppContextType extends AppState {
  claimOpportunity: (id: string) => void;
  unclaimOpportunity: (id: string) => void;
  bookmarkOpportunity: (id: string) => void;
  unbookmarkOpportunity: (id: string) => void;
  isClaimed: (id: string) => boolean;
  isBookmarked: (id: string) => boolean;
  updateSettings: (settings: Partial<UserSettings>) => void;
  getBookmarkedOpportunities: () => Opportunity[];
  getOpportunitiesWithDeadlines: () => Opportunity[];
}

const defaultSettings: UserSettings = {
  notifications: true,
  darkMode: true,
  digest: false,
  categories: ['Student Packs', 'Cloud Credits', 'Hackathons', 'Internships'],
};

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEYS = {
  claimed: 'studentstack_claimed',
  bookmarked: 'studentstack_bookmarked',
  settings: 'studentstack_settings',
};

function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore parsing errors
  }
  return defaultValue;
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors
  }
}

export function AppProvider({ children, initialOpportunities }: { children: ReactNode; initialOpportunities: Opportunity[] }) {
  const [opportunities] = useState<Opportunity[]>(initialOpportunities);
  const [claimedIds, setClaimedIds] = useState<Set<string>>(() => {
    const stored = loadFromStorage<string[]>(STORAGE_KEYS.claimed, []);
    return new Set(stored);
  });
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    const stored = loadFromStorage<string[]>(STORAGE_KEYS.bookmarked, []);
    return new Set(stored);
  });
  const [settings, setSettings] = useState<UserSettings>(() =>
    loadFromStorage(STORAGE_KEYS.settings, defaultSettings)
  );
  const [isLoading] = useState(false);

  // Persist claimed IDs
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.claimed, Array.from(claimedIds));
  }, [claimedIds]);

  // Persist bookmarked IDs
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.bookmarked, Array.from(bookmarkedIds));
  }, [bookmarkedIds]);

  // Persist settings
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.settings, settings);
  }, [settings]);

  // Merge claimed status into opportunities
  const opportunitiesWithState = opportunities.map(opp => ({
    ...opp,
    claimed: claimedIds.has(opp.id),
  }));

  const metrics = getMetrics(opportunitiesWithState);

  const claimOpportunity = (id: string) => {
    setClaimedIds(prev => new Set(prev).add(id));
  };

  const unclaimOpportunity = (id: string) => {
    setClaimedIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const bookmarkOpportunity = (id: string) => {
    setBookmarkedIds(prev => new Set(prev).add(id));
  };

  const unbookmarkOpportunity = (id: string) => {
    setBookmarkedIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const isClaimed = (id: string) => claimedIds.has(id);
  const isBookmarked = (id: string) => bookmarkedIds.has(id);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const getBookmarkedOpportunities = () =>
    opportunitiesWithState.filter(opp => bookmarkedIds.has(opp.id));

  const getOpportunitiesWithDeadlines = () =>
    opportunitiesWithState.filter(opp => opp.deadline);

  return (
    <AppContext.Provider
      value={{
        opportunities: opportunitiesWithState,
        claimedIds,
        bookmarkedIds,
        settings,
        isLoading,
        metrics,
        claimOpportunity,
        unclaimOpportunity,
        bookmarkOpportunity,
        unbookmarkOpportunity,
        isClaimed,
        isBookmarked,
        updateSettings,
        getBookmarkedOpportunities,
        getOpportunitiesWithDeadlines,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export { isClosingSoon };
