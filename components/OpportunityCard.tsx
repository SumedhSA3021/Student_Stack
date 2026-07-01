// Pure presentational component — adaptive card variants based on eventType

import {
  ExternalLink,
  Calendar,
  Sparkles,
  Check,
  Clock,
  Bookmark,
  Trophy,
  Gift,
  User,
  Video,
  MapPin,
} from 'lucide-react';
import { Opportunity, CATEGORIES, formatDate, isClosingSoon } from '@/lib/opportunities';
import { cn } from '@/lib/utils';

/** Checks if the URL has a safe web scheme (http, https, or hash) */
const isSafeUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  const trimmed = url.trim().toLowerCase();
  return trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed === '#';
};

interface OpportunityCardProps {
  opportunity: Opportunity;
  onClaim?: (id: string) => void;
  onBookmark?: (id: string) => void;
  showBookmark?: boolean;
  isBookmarked?: boolean;
  showRemove?: boolean;
  onRemove?: (id: string) => void;
}

const categoryColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  'student-packs': { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'hover:shadow-emerald-500/20' },
  'cloud-credits': { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'hover:shadow-cyan-500/20' },
  'hackathons': { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', glow: 'hover:shadow-amber-500/20' },
  'internships': { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', glow: 'hover:shadow-rose-500/20' },
  'courses': { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', glow: 'hover:shadow-violet-500/20' },
  'tools': { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'hover:shadow-blue-500/20' },
};

// ─────────────────────────────────────────────────────────
// Micro-Badge Row (shared across seminar variant)
// ─────────────────────────────────────────────────────────
function MicroBadge({ icon: Icon, label, className }: { icon: React.ComponentType<{ className?: string }>; label: string; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs text-muted-foreground/80', className)}>
      <Icon className="h-3.5 w-3.5 flex-shrink-0" />
      <span className="truncate">{label}</span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────
// Seminar Card Variant
// ─────────────────────────────────────────────────────────
function SeminarCard({ opportunity, ctaUrl, onCtaClick, bookmarkSlot }: {
  opportunity: Opportunity;
  ctaUrl: string;
  onCtaClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  bookmarkSlot: React.ReactNode;
}) {
  const colors = categoryColors[opportunity.category] || categoryColors['courses'];

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className={cn(
          'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium border',
          'bg-violet-500/10 border-violet-500/30 text-violet-400'
        )}>
          <Video className="h-3.5 w-3.5" />
          Seminar
        </span>
        {bookmarkSlot}
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-foreground leading-tight mb-2 group-hover:text-foreground/90 transition-colors">
        {opportunity.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
        {opportunity.description}
      </p>

      {/* Micro-badge rows */}
      <div className="flex flex-col gap-2 mb-4">
        {opportunity.speaker && (
          <MicroBadge icon={User} label={opportunity.speaker} />
        )}
        {opportunity.deadline && (
          <MicroBadge icon={Calendar} label={formatDate(opportunity.deadline)} />
        )}
        {opportunity.liveStreamUrl ? (
          <MicroBadge icon={Video} label="Live Stream Available" className="text-cyan-400/80" />
        ) : opportunity.venue ? (
          <MicroBadge icon={MapPin} label={opportunity.venue} />
        ) : null}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs text-muted-foreground/80">{opportunity.provider}</span>
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCtaClick}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-400 hover:to-purple-500 shadow-sm shadow-violet-500/20"
        >
          Secure Spot ↗
        </a>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// Hackathon Card Variant
// ─────────────────────────────────────────────────────────
function HackathonCard({ opportunity, ctaUrl, onCtaClick, bookmarkSlot }: {
  opportunity: Opportunity;
  ctaUrl: string;
  onCtaClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  bookmarkSlot: React.ReactNode;
}) {
  const closingSoon = opportunity.deadline && isClosingSoon(opportunity.deadline);

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className={cn(
          'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium border',
          'bg-amber-500/10 border-amber-500/30 text-amber-400'
        )}>
          <Trophy className="h-3.5 w-3.5" />
          Hackathon
        </span>
        <div className="flex items-center gap-2">
          {closingSoon && (
            <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/20 border border-rose-500/30 px-2.5 py-1 text-xs font-medium text-rose-400">
              <Clock className="h-3.5 w-3.5" />
              Closing Soon
            </span>
          )}
          {bookmarkSlot}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-foreground leading-tight mb-2 group-hover:text-foreground/90 transition-colors">
        {opportunity.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
        {opportunity.description}
      </p>

      {/* Prize + Venue row */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        {opportunity.value && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-sm font-semibold text-amber-400">
            <Trophy className="h-3.5 w-3.5" />
            {opportunity.value}
          </span>
        )}
        {opportunity.venue && (
          <MicroBadge icon={MapPin} label={opportunity.venue} />
        )}
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {opportunity.tags.slice(0, 3).map(tag => (
          <span key={tag} className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground/80">{opportunity.provider}</span>
          {opportunity.deadline && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground/80">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(opportunity.deadline)}
            </span>
          )}
        </div>
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCtaClick}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 shadow-sm shadow-amber-500/20"
        >
          Register ↗
        </a>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// Discount Card Variant
// ─────────────────────────────────────────────────────────
function DiscountCard({ opportunity, ctaUrl, onCtaClick, bookmarkSlot }: {
  opportunity: Opportunity;
  ctaUrl: string;
  onCtaClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  bookmarkSlot: React.ReactNode;
}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className={cn(
          'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium border',
          'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
        )}>
          <Gift className="h-3.5 w-3.5" />
          Student Offer
        </span>
        {bookmarkSlot}
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-foreground leading-tight mb-2 group-hover:text-foreground/90 transition-colors">
        {opportunity.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
        {opportunity.description}
      </p>

      {/* Value badge */}
      {opportunity.value && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 text-sm font-semibold text-cyan-500">
            <Gift className="h-3.5 w-3.5" />
            {opportunity.value}
          </span>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs text-muted-foreground/80">{opportunity.provider}</span>
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCtaClick}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
            opportunity.claimed
              ? 'bg-muted text-muted-foreground'
              : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-400 hover:to-cyan-400 shadow-sm shadow-emerald-500/20'
          )}
        >
          {opportunity.claimed ? 'Claimed ✓' : 'Claim Offer ↗'}
        </a>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// General Card Variant (default — existing design)
// ─────────────────────────────────────────────────────────
function GeneralCard({ opportunity, ctaUrl, onCtaClick, bookmarkSlot, showRemove, onRemove }: {
  opportunity: Opportunity;
  ctaUrl: string;
  onCtaClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  bookmarkSlot: React.ReactNode;
  showRemove?: boolean;
  onRemove?: (id: string) => void;
}) {
  const colors = categoryColors[opportunity.category] || categoryColors['tools'];
  const categoryInfo = CATEGORIES.find(c => c.id === opportunity.category);
  const showDeadline = opportunity.deadline;
  const closingSoon = opportunity.deadline && isClosingSoon(opportunity.deadline);

  return (
    <>
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className={cn(
          'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium',
          colors.bg, colors.border, 'border'
        )}>
          {categoryInfo && <categoryInfo.icon className={cn('h-3.5 w-3.5', colors.text)} />}
          <span className={colors.text}>{categoryInfo?.label}</span>
        </span>

        {opportunity.claimed ? (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 text-xs font-medium text-emerald-400">
            <Check className="h-3.5 w-3.5" />
            Claimed
          </span>
        ) : closingSoon ? (
          <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/20 border border-rose-500/30 px-2.5 py-1 text-xs font-medium text-rose-400">
            <Clock className="h-3.5 w-3.5" />
            Closing Soon
          </span>
        ) : null}
      </div>

      <h3 className="text-base font-semibold text-foreground leading-tight mb-2 group-hover:text-foreground/90 transition-colors">
        {opportunity.title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
        {opportunity.description}
      </p>

      <div className="mt-auto">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {opportunity.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground/80">{opportunity.provider}</span>
            {opportunity.value && (
              <span className="text-sm font-semibold text-foreground/90">{opportunity.value}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {showDeadline && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground/80">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(opportunity.deadline)}
              </span>
            )}

            {bookmarkSlot}

            {showRemove && onRemove ? (
              <button
                onClick={() => onRemove(opportunity.id)}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-all"
              >
                Remove
              </button>
            ) : (
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onCtaClick}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
                  opportunity.claimed
                    ? 'bg-muted text-muted-foreground'
                    : 'bg-primary text-primary-foreground hover:brightness-105 shadow-sm'
                )}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {opportunity.claimed ? 'View' : 'Claim Now'}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// Main Export: OpportunityCard (Adaptive)
// ─────────────────────────────────────────────────────────
export function OpportunityCard({
  opportunity,
  onClaim,
  onBookmark,
  showBookmark = true,
  isBookmarked = false,
  showRemove = false,
  onRemove,
}: OpportunityCardProps) {
  const colors = categoryColors[opportunity.category] || categoryColors['tools'];
  const rawCtaUrl = opportunity.registrationUrl || opportunity.url;
  const ctaUrl = isSafeUrl(rawCtaUrl) ? rawCtaUrl : '#';
  const eventType = opportunity.eventType || 'general';
 
  const onCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ctaUrl === '#') {
      e.preventDefault();
      return;
    }
    if (onClaim && !opportunity.claimed) {
      onClaim(opportunity.id);
    }
  };

  // Bookmark button (shared across all variants)
  const bookmarkSlot = showBookmark && onBookmark ? (
    <button
      onClick={() => onBookmark(opportunity.id)}
      className={cn(
        'p-1.5 rounded-lg transition-all',
        isBookmarked
          ? 'bg-cyan-500/20 text-cyan-500'
          : 'hover:bg-accent text-muted-foreground/60 hover:text-foreground'
      )}
      title={isBookmarked ? 'Remove from saved' : 'Save for later'}
    >
      <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-current')} />
    </button>
  ) : null;

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-xl border border-border bg-card/40 backdrop-blur-xs p-5 transition-all duration-300',
        'hover:border-border/80 hover:bg-card/75',
        colors.glow,
        'hover:shadow-md',
        'animate-fadeInUp',
        opportunity.featured && 'ring-1 ring-amber-500/30'
      )}
    >
      {opportunity.featured && (
        <div className="absolute -top-2.5 left-4 flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 py-0.5">
          <Sparkles className="h-3 w-3 text-white" />
          <span className="text-xs font-medium text-white">Featured</span>
        </div>
      )}

      {eventType === 'seminar' && (
        <SeminarCard opportunity={opportunity} ctaUrl={ctaUrl} onCtaClick={onCtaClick} bookmarkSlot={bookmarkSlot} />
      )}
      {eventType === 'hackathon' && (
        <HackathonCard opportunity={opportunity} ctaUrl={ctaUrl} onCtaClick={onCtaClick} bookmarkSlot={bookmarkSlot} />
      )}
      {eventType === 'discount' && (
        <DiscountCard opportunity={opportunity} ctaUrl={ctaUrl} onCtaClick={onCtaClick} bookmarkSlot={bookmarkSlot} />
      )}
      {eventType === 'general' && (
        <GeneralCard opportunity={opportunity} ctaUrl={ctaUrl} onCtaClick={onCtaClick} bookmarkSlot={bookmarkSlot} showRemove={showRemove} onRemove={onRemove} />
      )}
    </div>
  );
}
