'use client';

import { useMemo } from 'react';
import { useApp } from '@/lib/OpportunityContext';
import { formatDate, isClosingSoon } from '@/lib/opportunities';
import { Calendar as CalendarIcon, Clock, ExternalLink, AlertCircle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CalendarContent() {
  const { getOpportunitiesWithDeadlines } = useApp();

  // Get all opportunities with deadlines (including claimed ones)
  const opportunitiesWithDeadlines = useMemo(() => {
    return getOpportunitiesWithDeadlines()
      .sort((a, b) => {
        if (!a.deadline || !b.deadline) return 0;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
  }, [getOpportunitiesWithDeadlines]);

  const closingSoon = opportunitiesWithDeadlines.filter(opp =>
    opp.deadline && isClosingSoon(opp.deadline) && !opp.claimed
  );

  const upcoming = opportunitiesWithDeadlines.filter(opp =>
    opp.deadline && (!isClosingSoon(opp.deadline) || opp.claimed)
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <CalendarIcon className="h-6 w-6 text-cyan-500" />
          <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Track upcoming deadlines and important dates
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        <div className="rounded-xl border border-border bg-card/45 backdrop-blur-sm p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10">
              <AlertCircle className="h-4 w-4 text-rose-555 text-rose-500" />
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Closing Soon</span>
          </div>
          <span className="text-2xl font-bold text-rose-500">{closingSoon.length}</span>
        </div>
        <div className="rounded-xl border border-border bg-card/45 backdrop-blur-sm p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10">
              <Clock className="h-4 w-4 text-cyan-500" />
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Upcoming</span>
          </div>
          <span className="text-2xl font-bold text-cyan-555 text-cyan-500">{upcoming.length}</span>
        </div>
        <div className="rounded-xl border border-border bg-card/45 backdrop-blur-sm p-4 shadow-sm col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
              <CalendarIcon className="h-4 w-4 text-amber-500" />
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Deadlines</span>
          </div>
          <span className="text-2xl font-bold text-amber-500">{opportunitiesWithDeadlines.length}</span>
        </div>
      </div>

      {/* Closing Soon Section */}
      {closingSoon.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-rose-500" />
            <h2 className="text-lg font-semibold text-foreground">Closing Soon</h2>
          </div>
          <div className="space-y-3">
            {closingSoon.map(opp => (
              <DeadlineCard key={opp.id} opportunity={opp} urgent />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Section */}
      {upcoming.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-cyan-500" />
            <h2 className="text-lg font-semibold text-foreground">Upcoming Deadlines</h2>
          </div>
          <div className="space-y-3">
            {upcoming.map(opp => (
              <DeadlineCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        </section>
      )}

      {opportunitiesWithDeadlines.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/60 border border-border mb-4">
            <CalendarIcon className="h-8 w-8 text-muted-foreground/60" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No upcoming deadlines</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            No opportunities with deadlines are currently available.
          </p>
        </div>
      )}
    </div>
  );
}

interface DeadlineCardProps {
  opportunity: {
    id: string;
    title: string;
    provider: string;
    deadline?: string;
    url: string;
    claimed?: boolean;
  };
  urgent?: boolean;
}

function DeadlineCard({ opportunity, urgent }: DeadlineCardProps) {
  if (!opportunity.deadline) return null;

  return (
    <a
      href={opportunity.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 shadow-xs',
        urgent
          ? 'border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10'
          : 'border-border bg-card/45 hover:bg-card/75',
        opportunity.claimed && 'opacity-70'
      )}
    >
      {/* Date Indicator */}
      <div className={cn(
        'flex flex-col items-center justify-center w-14 h-14 rounded-lg border shrink-0',
        opportunity.claimed
          ? 'border-emerald-500/30 bg-emerald-500/10'
          : urgent
          ? 'border-rose-500/30 bg-rose-500/10'
          : 'border-border/80 bg-accent/50'
      )}>
        <span className={cn(
          'text-lg font-bold',
          opportunity.claimed
            ? 'text-emerald-500'
            : urgent ? 'text-rose-500' : 'text-foreground/90'
        )}>
          {new Date(opportunity.deadline).getDate()}
        </span>
        <span className={cn(
          'text-[10px] uppercase tracking-wider font-semibold',
          opportunity.claimed
            ? 'text-emerald-500/70'
            : urgent ? 'text-rose-500/70' : 'text-muted-foreground'
        )}>
          {new Date(opportunity.deadline).toLocaleDateString('en-US', { month: 'short' })}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-foreground mb-0.5 truncate group-hover:text-foreground/90 transition-colors">
          {opportunity.title}
        </h3>
        <p className="text-xs text-muted-foreground truncate">{opportunity.provider}</p>
      </div>

      {/* Time Left */}
      <div className="flex items-center gap-2">
        {opportunity.claimed && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-500 font-semibold">
            <Check className="h-3.5 w-3.5" />
            Claimed
          </span>
        )}
        <span className={cn(
          'text-xs font-semibold',
          opportunity.claimed
            ? 'text-muted-foreground/80'
            : urgent ? 'text-rose-500' : 'text-muted-foreground'
        )}>
          {formatDate(opportunity.deadline)}
        </span>
        <ExternalLink className="h-4 w-4 text-muted-foreground/60 group-hover:text-muted-foreground/90 transition-colors" />
      </div>
    </a>
  );
}
