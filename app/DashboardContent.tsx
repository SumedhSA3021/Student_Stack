'use client';

import { useState, useMemo } from 'react';
import { KpiStrip } from '@/components/KpiStrip';
import { NotificationEngineWidget } from '@/components/NotificationEngineWidget';
import { CategoryFilterChips } from '@/components/CategoryFilterChips';
import { OpportunityGrid } from '@/components/OpportunityGrid';
import { useApp } from '@/lib/OpportunityContext';
import { OpportunityCategory, CATEGORIES, getFeaturedOpportunities } from '@/lib/opportunities';
import { SortAsc, ArrowUpDown } from 'lucide-react';
import { toast, Toaster } from 'sonner';

type SortOption = 'default' | 'deadline-asc' | 'deadline-desc';

export function DashboardContent() {
  const { opportunities, metrics, claimOpportunity, bookmarkOpportunity, unbookmarkOpportunity, isBookmarked, searchQuery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | 'all' | 'seminars'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const featured = useMemo(() => getFeaturedOpportunities(opportunities), [opportunities]);

  const filteredOpportunities = useMemo(() => {
    let filtered = selectedCategory === 'all'
      ? opportunities
      : selectedCategory === 'seminars'
        ? opportunities.filter(opp => opp.eventType === 'seminar')
        : opportunities.filter(opp => opp.category === selectedCategory);

    // Apply full-text search across title, description, provider, and tags
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(opp =>
        opp.title.toLowerCase().includes(q) ||
        opp.description.toLowerCase().includes(q) ||
        opp.provider.toLowerCase().includes(q) ||
        opp.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Sort by deadline
    if (sortOption === 'deadline-asc') {
      filtered = [...filtered].sort((a, b) => {
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
    } else if (sortOption === 'deadline-desc') {
      filtered = [...filtered].sort((a, b) => {
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
      });
    }

    return filtered;
  }, [opportunities, selectedCategory, sortOption, searchQuery]);

  // Calculate per-category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: opportunities.length };
    CATEGORIES.forEach(cat => {
      counts[cat.id] = opportunities.filter(opp => opp.category === cat.id).length;
    });
    counts['seminars'] = opportunities.filter(opp => opp.eventType === 'seminar').length;
    return counts;
  }, [opportunities]);

  const handleClaim = (id: string) => {
    const opportunity = opportunities.find(opp => opp.id === id);
    if (opportunity) {
      claimOpportunity(id);
      toast.success(`Claimed "${opportunity.title}" successfully!`);
    }
  };

  const handleBookmark = (id: string) => {
    if (isBookmarked(id)) {
      unbookmarkOpportunity(id);
      toast.info('Removed from saved');
    } else {
      bookmarkOpportunity(id);
      toast.success('Added to saved');
    }
  };

  const cycleSort = () => {
    const options: SortOption[] = ['default', 'deadline-asc', 'deadline-desc'];
    const currentIndex = options.indexOf(sortOption);
    const nextIndex = (currentIndex + 1) % options.length;
    setSortOption(options[nextIndex]);
  };

  const getSortLabel = () => {
    switch (sortOption) {
      case 'deadline-asc': return 'Deadline (Soonest)';
      case 'deadline-desc': return 'Deadline (Latest)';
      default: return 'Sort by deadline';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Discover and claim student opportunities
        </p>
      </div>

      {/* Metrics Strip */}
      <div className="mb-8">
        <KpiStrip data={metrics} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8">
        {/* Opportunities Column */}
        <div>
          {/* Filter Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">All Opportunities</h2>
              <span className="text-xs text-muted-foreground bg-accent/80 px-2 py-0.5 rounded">
                {filteredOpportunities.length}
              </span>
            </div>
            <button
              onClick={cycleSort}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {sortOption === 'default' ? (
                <SortAsc className="h-3.5 w-3.5" />
              ) : (
                <ArrowUpDown className="h-3.5 w-3.5" />
              )}
              {getSortLabel()}
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <CategoryFilterChips
              selected={selectedCategory}
              onSelect={setSelectedCategory}
              counts={categoryCounts}
            />
          </div>

          {/* Opportunities Grid */}
          <OpportunityGrid
            opportunities={filteredOpportunities}
            onClaim={handleClaim}
            onBookmark={handleBookmark}
            exclude={[]}
          />

          {filteredOpportunities.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No opportunities found in this category.</p>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="hidden lg:block">
          <NotificationEngineWidget />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'bg-card border border-border text-foreground',
        }}
      />
    </div>
  );
}
