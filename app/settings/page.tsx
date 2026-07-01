import { SettingsContent } from './SettingsContent';
import { Providers } from '../providers';

// ISR: Revalidate every hour
export const revalidate = 3600;

// Server-side data fetching
async function getOpportunities() {
  const { getLiveOpportunities } = await import('@/lib/opportunities');
  return getLiveOpportunities();
}

export default async function SettingsPage() {
  const opportunities = await getOpportunities();

  return (
    <Providers opportunities={opportunities}>
      <SettingsContent />
    </Providers>
  );
}
