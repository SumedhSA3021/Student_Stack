import { AppLayout } from '@/components/AppLayout';
import { OpportunitiesContent } from './OpportunitiesContent';
import { Providers } from '../providers';

// ISR: Revalidate every hour
export const revalidate = 3600;

// Server-side data fetching
async function getOpportunities() {
  const { getLiveOpportunities } = await import('@/lib/opportunities');
  return getLiveOpportunities();
}

export default async function OpportunitiesPage() {
  const opportunities = await getOpportunities();

  return (
    <Providers opportunities={opportunities}>
      <AppLayout currentPath="/opportunities">
        <OpportunitiesContent />
      </AppLayout>
    </Providers>
  );
}
