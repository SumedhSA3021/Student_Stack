'use client';

import { ExternalLink, Sparkles, Gift, Bookmark } from 'lucide-react';
import { Opportunity } from '@/lib/opportunities';
import { cn } from '@/lib/utils';

interface FeaturedOpportunityProps {
  opportunity: Opportunity;
  onClaim?: (id: string) => void;
  onBookmark?: (id: string) => void;
  isBookmarked?: boolean;
}

export function FeaturedOpportunity({ opportunity, onClaim, onBookmark, isBookmarked = false }: FeaturedOpportunityProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-card via-card to-amber-500/5 transition-all duration-300">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

      {/* Content */}
      <div className="relative p-6 lg:p-8">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 px-3 py-1.5">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">Featured Opportunity</span>
          </div>
          {opportunity.value && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 text-sm font-semibold text-cyan-500">
              <Gift className="h-4 w-4" />
              {opportunity.value}
            </span>
          )}
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="flex-1">
            <h2 className="text-xl lg:text-2xl font-semibold text-foreground leading-tight mb-3">
              {opportunity.title}
            </h2>
            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed max-w-2xl mb-4">
              {opportunity.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {opportunity.tags.map(tag => (
                <span
                  key={tag}
                  className="rounded-md bg-muted border border-border px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Provider */}
            <div className="text-sm text-muted-foreground/80">
              Provided by <span className="text-foreground/90 font-medium">{opportunity.provider}</span>
            </div>
          </div>

          {/* CTA */}
          <div className="lg:flex-shrink-0 lg:self-center flex items-center gap-3">
            {onBookmark && (
              <button
                onClick={() => onBookmark(opportunity.id)}
                className={cn(
                  'p-2.5 rounded-lg transition-all',
                  isBookmarked
                    ? 'bg-cyan-500/20 text-cyan-500'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
                title={isBookmarked ? 'Remove from saved' : 'Save for later'}
              >
                <Bookmark className={cn('h-5 w-5', isBookmarked && 'fill-current')} />
              </button>
            )}
            <a
              href={opportunity.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (onClaim && !opportunity.claimed) {
                  onClaim(opportunity.id);
                }
              }}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all',
                'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white',
                'hover:from-cyan-400 hover:to-emerald-400',
                'shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30'
              )}
            >
              <span>{opportunity.claimed ? 'View Opportunity' : 'Claim Now'}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </div>
  );
}
