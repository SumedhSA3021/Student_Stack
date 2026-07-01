'use client';

import { AppProvider } from '@/lib/OpportunityContext';
import { Opportunity } from '@/lib/opportunities';
import { ReactNode } from 'react';

export function Providers({ children, opportunities }: { children: ReactNode; opportunities: Opportunity[] }) {
  return (
    <AppProvider initialOpportunities={opportunities}>{children}</AppProvider>
  );
}
