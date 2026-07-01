'use client';

import { OpportunityGrid } from '@/components/OpportunityGrid';
import { useApp } from '@/lib/OpportunityContext';
import { Bookmark, Trash2 } from 'lucide-react';
import { toast, Toaster } from 'sonner';

export function SavedContent() {
  const { getBookmarkedOpportunities, unbookmarkOpportunity } = useApp();

  const savedOpportunities = getBookmarkedOpportunities();

  const handleRemove = (id: string) => {
    unbookmarkOpportunity(id);
    toast.success('Removed from saved');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Bookmark className="h-6 w-6 text-cyan-500" />
          <h1 className="text-2xl font-bold text-foreground">Saved Opportunities</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Your bookmarked opportunities for quick access
        </p>
      </div>

      {savedOpportunities.length > 0 ? (
        <>
          {/* Stats Bar */}
          <div className="flex items-center gap-4 mb-6 p-4 rounded-xl border border-border bg-card/45 backdrop-blur-sm shadow-sm">
            <div className="flex-1">
              <span className="text-sm text-muted-foreground">
                {savedOpportunities.length} saved {savedOpportunities.length === 1 ? 'opportunity' : 'opportunities'}
              </span>
            </div>
            <button
              onClick={() => {
                savedOpportunities.forEach(opp => unbookmarkOpportunity(opp.id));
                toast.success('All saved opportunities cleared');
              }}
              className="inline-flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-450 transition-colors font-medium"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear All
            </button>
          </div>

          {/* Saved Grid */}
          <OpportunityGrid
            opportunities={savedOpportunities}
            showBookmark={false}
            showRemove={true}
            onRemove={handleRemove}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/60 border border-border mb-4">
            <Bookmark className="h-8 w-8 text-muted-foreground/60" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No saved opportunities</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Browse opportunities and save the ones you're interested in for quick access later.
          </p>
          <a
            href="/opportunities"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:brightness-105 transition-colors shadow-sm"
          >
            Browse Opportunities
          </a>
        </div>
      )}
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'bg-card border border-border text-foreground',
        }}
      />
    </div>
  );
}
