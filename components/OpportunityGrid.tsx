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
      'grid gap-4 lg:gap-6',
      'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      'stagger-children',
      className
    )}>
      {filtered.map(opportunity => (
        <div 
          key={opportunity.id} 
          className={cn(
            'animate-fadeInUp transition-all duration-300',
            opportunity.featured ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'
          )}
        >
          <OpportunityCard
            opportunity={opportunity}
            onClaim={onClaim}
            onBookmark={onBookmark}
            showBookmark={showBookmark}
            isBookmarked={isBookmarked?.(opportunity.id)}
            showRemove={showRemove}
            onRemove={onRemove}
          />
        </div>
      ))}
    </div>
  );
}
