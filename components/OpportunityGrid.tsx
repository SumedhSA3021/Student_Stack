// Pure presentational component — no hooks, renders on server

import { Opportunity } from '@/lib/opportunities';
import { OpportunityCard } from '@/components/OpportunityCard';
import { cn } from '@/lib/utils';

interface OpportunityGridProps {
  opportunities: Opportunity[];
  onClaim?: (id: string) => void;
  onBookmark?: (id: string) => void;
  exclude?: string[];
  className?: string;
  showBookmark?: boolean;
  isBookmarked?: (id: string) => boolean;
  showRemove?: boolean;
  onRemove?: (id: string) => void;
}

export function OpportunityGrid({
  opportunities,
  onClaim,
  onBookmark,
  exclude = [],
  className,
  showBookmark = true,
  isBookmarked,
  showRemove = false,
  onRemove,
}: OpportunityGridProps) {
  const filtered = opportunities.filter(opp => !exclude.includes(opp.id));

  return (
    <div className={cn(
      'grid gap-4 lg:gap-5',
      'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      className
    )}>
      {filtered.map(opportunity => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
          onClaim={onClaim}
          onBookmark={onBookmark}
          showBookmark={showBookmark}
          isBookmarked={isBookmarked?.(opportunity.id)}
          showRemove={showRemove}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
