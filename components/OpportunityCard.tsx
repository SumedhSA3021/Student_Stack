'use client';

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
  Rss,
} from 'lucide-react';
import Atropos from 'atropos/react';
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
  'student-packs': { 
    bg: 'bg-gradient-to-r from-[#10b981]/15 to-[#22d3ee]/15', 
    border: 'border-emerald-500/40', 
    text: 'text-emerald-400', 
    glow: 'hover:shadow-[#10b981]/20' 
  },
  'cloud-credits': { 
    bg: 'bg-gradient-to-r from-[#10b981]/15 to-[#22d3ee]/15', 
    border: 'border-cyan-500/40', 
    text: 'text-cyan-400', 
    glow: 'hover:shadow-[#22d3ee]/20' 
  },
  'hackathons': { 
    bg: 'bg-amber-500/10', 
    border: 'border-amber-500/40', 
    text: 'text-amber-400', 
    glow: 'hover:shadow-amber-500/20' 
  },
  'internships': { 
    bg: 'bg-rose-500/10', 
    border: 'border-rose-500/30', 
    text: 'text-rose-400', 
    glow: 'hover:shadow-rose-500/20' 
  },
  'courses': { 
    bg: 'bg-violet-500/10', 
    border: 'border-violet-500/30', 
    text: 'text-violet-400', 
    glow: 'hover:shadow-violet-500/20' 
  },
  'tools': { 
    bg: 'bg-blue-500/10', 
    border: 'border-blue-500/30', 
    text: 'text-blue-400', 
    glow: 'hover:shadow-blue-500/20' 
  },
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
  return (
    <>
      {/* Header Badges - Floating at offset 12 */}
      <div className="flex items-start justify-between gap-3 mb-4" data-atropos-offset="12">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold border bg-violet-500/15 border-violet-500/40 text-violet-400 shadow-sm">
            <Video className="h-3.5 w-3.5" />
            Seminar
          </span>
          {opportunity.source && opportunity.source !== 'local' && (
            <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold border bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-sm">
              <Rss className="h-3 w-3" />
              Global Feed
            </span>
          )}
        </div>
        {bookmarkSlot}
      </div>

      {/* Main Text - Floating at offset 5 */}
      <div className="flex flex-col flex-1 mb-4" data-atropos-offset="5">
        <h3 className="text-base font-bold text-foreground leading-tight mb-2 group-hover:text-foreground/90 transition-colors">
          {opportunity.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {opportunity.description}
        </p>

        {/* Micro-badge rows */}
        <div className="flex flex-col gap-2 mt-auto">
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
      </div>

      {/* Footer - Floating at offset 8 */}
      <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4" data-atropos-offset="8">
        <span className="text-xs text-muted-foreground/80 font-medium">{opportunity.provider}</span>
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCtaClick}
          className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-all bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-400 hover:to-purple-500 shadow-lg shadow-violet-500/20"
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
      {/* Header Badges - Floating at offset 12 */}
      <div className="flex items-start justify-between gap-3 mb-4" data-atropos-offset="12">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold border bg-amber-500/15 border-amber-500/40 text-amber-400 shadow-sm">
            <Trophy className="h-3.5 w-3.5" />
            Hackathon
          </span>
          {opportunity.source && opportunity.source !== 'local' && (
            <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold border bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-sm">
              <Rss className="h-3 w-3" />
              Global Feed
            </span>
          )}
          {closingSoon && (
            <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/20 border border-rose-500/30 px-2.5 py-1 text-xs font-semibold text-rose-400 shadow-sm">
              <Clock className="h-3.5 w-3.5 animate-pulse" />
              Closing Soon
            </span>
          )}
        </div>
        {bookmarkSlot}
      </div>

      {/* Main Text - Floating at offset 5 */}
      <div className="flex flex-col flex-1 mb-4" data-atropos-offset="5">
        <h3 className="text-base font-bold text-foreground leading-tight mb-2 group-hover:text-foreground/90 transition-colors">
          {opportunity.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {opportunity.description}
        </p>

        {/* Prize + Venue row */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          {opportunity.value && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 px-2.5 py-1 text-xs font-bold text-amber-400 shadow-sm">
              <Trophy className="h-3.5 w-3.5" />
              {opportunity.value}
            </span>
          )}
          {opportunity.venue && (
            <MicroBadge icon={MapPin} label={opportunity.venue} />
          )}
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap mt-auto">
          {opportunity.tags.slice(0, 3).map(tag => (
            <span key={tag} className="rounded bg-white/5 border border-white/5 px-2 py-0.5 text-xs text-muted-foreground font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer - Floating at offset 8 */}
      <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4" data-atropos-offset="8">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted-foreground/80 font-medium">{opportunity.provider}</span>
          {opportunity.deadline && (
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground/80">
              <Calendar className="h-3 w-3" />
              {formatDate(opportunity.deadline)}
            </span>
          )}
        </div>
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCtaClick}
          className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-all bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 shadow-lg shadow-amber-500/20"
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
  const isPacksOrCredits = opportunity.category === 'student-packs' || opportunity.category === 'cloud-credits';

  return (
    <>
      {/* Header Badges - Floating at offset 12 */}
      <div className="flex items-start justify-between gap-3 mb-4" data-atropos-offset="12">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold border bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-sm">
            <Gift className="h-3.5 w-3.5" />
            Student Offer
          </span>
          {opportunity.source && opportunity.source !== 'local' && (
            <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold border bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-sm">
              <Rss className="h-3 w-3" />
              Global Feed
            </span>
          )}
        </div>
        {bookmarkSlot}
      </div>

      {/* Main Text - Floating at offset 5 */}
      <div className="flex flex-col flex-1 mb-4" data-atropos-offset="5">
        <h3 className="text-base font-bold text-foreground leading-tight mb-2 group-hover:text-foreground/90 transition-colors">
          {opportunity.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {opportunity.description}
        </p>

        {/* Value badge */}
        {opportunity.value && (
          <div className="mb-3 mt-auto">
            <span className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold shadow-sm",
              isPacksOrCredits 
                ? "bg-gradient-to-r from-[#10b981]/25 to-[#22d3ee]/25 border-emerald-500/30 text-emerald-400"
                : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
            )}>
              <Gift className="h-3.5 w-3.5" />
              {opportunity.value}
            </span>
          </div>
        )}
      </div>

      {/* Footer - Floating at offset 8 */}
      <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4" data-atropos-offset="8">
        <span className="text-xs text-muted-foreground/80 font-medium">{opportunity.provider}</span>
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCtaClick}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-all shadow-lg',
            opportunity.claimed
              ? 'bg-white/10 text-muted-foreground hover:bg-white/15'
              : isPacksOrCredits
                ? 'bg-gradient-to-r from-[#10b981] to-[#22d3ee] text-white hover:opacity-90 shadow-emerald-500/10'
                : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-400 hover:to-cyan-400 shadow-emerald-500/25'
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
  const isPacksOrCredits = opportunity.category === 'student-packs' || opportunity.category === 'cloud-credits';

  return (
    <>
      {/* Header Badges - Floating at offset 12 */}
      <div className="flex items-start justify-between gap-3 mb-4" data-atropos-offset="12">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={cn(
            'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold border shadow-sm',
            colors.bg, colors.border
          )}>
            {categoryInfo && <categoryInfo.icon className={cn('h-3.5 w-3.5', colors.text)} />}
            <span className={colors.text}>{categoryInfo?.label}</span>
          </span>
          {opportunity.source && opportunity.source !== 'local' && (
            <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold border bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-sm">
              <Rss className="h-3 w-3" />
              Global Feed
            </span>
          )}
          {opportunity.claimed ? (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 text-xs font-semibold text-emerald-400 shadow-sm">
              <Check className="h-3.5 w-3.5" />
              Claimed
            </span>
          ) : closingSoon ? (
            <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/20 border border-rose-500/30 px-2.5 py-1 text-xs font-semibold text-rose-400 shadow-sm animate-pulse">
              <Clock className="h-3.5 w-3.5" />
              Closing Soon
            </span>
          ) : null}
        </div>
        {bookmarkSlot}
      </div>

      {/* Main Text - Floating at offset 5 */}
      <div className="flex flex-col flex-1 mb-4" data-atropos-offset="5">
        <h3 className="text-base font-bold text-foreground leading-tight mb-2 group-hover:text-foreground/90 transition-colors">
          {opportunity.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {opportunity.description}
        </p>

        <div className="flex items-center gap-2 flex-wrap mt-auto">
          {opportunity.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="rounded bg-white/5 border border-white/5 px-2 py-0.5 text-xs text-muted-foreground font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer - Floating at offset 8 */}
      <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4" data-atropos-offset="8">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted-foreground/80 font-medium truncate max-w-[120px]">{opportunity.provider}</span>
          {opportunity.value && (
            <span className="text-xs font-bold text-foreground/90 truncate max-w-[120px]">{opportunity.value}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {showDeadline && (
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground/85">
              <Calendar className="h-3 w-3" />
              {formatDate(opportunity.deadline)}
            </span>
          )}

          {showRemove && onRemove ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(opportunity.id);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-all"
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
                'inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-all shadow-lg',
                opportunity.claimed
                  ? 'bg-white/10 text-muted-foreground hover:bg-white/15'
                  : isPacksOrCredits
                    ? 'bg-gradient-to-r from-[#10b981] to-[#22d3ee] text-white hover:opacity-90 shadow-emerald-500/10'
                    : 'bg-primary text-primary-foreground hover:brightness-105'
              )}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {opportunity.claimed ? 'View' : 'Claim Now'}
            </a>
          )}
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

  // Bookmark button (shared across all variants) - Floating at offset 12
  const bookmarkSlot = showBookmark && onBookmark ? (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onBookmark(opportunity.id);
      }}
      className={cn(
        'p-1.5 rounded-lg transition-all relative z-30 shadow-md border',
        isBookmarked
          ? 'bg-gradient-to-r from-[#10b981]/25 to-[#22d3ee]/25 border-emerald-500/40 text-emerald-400'
          : 'bg-white/5 border-white/10 hover:bg-white/10 text-muted-foreground/80 hover:text-white'
      )}
      title={isBookmarked ? 'Remove from saved' : 'Save for later'}
    >
      <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-current')} />
    </button>
  ) : null;

  return (
    <Atropos
      className={cn(
        'w-full h-full rounded-2xl group transition-all duration-300',
        colors.glow,
        opportunity.featured && 'ring-1 ring-amber-500/30'
      )}
      highlight={true}
      shadow={true}
      shadowOffset={35}
      rotateTouch={true}
    >
      {/* Main card inner layout */}
      <div 
        className={cn(
          'relative w-full h-full flex flex-col p-5 min-h-[250px] rounded-2xl overflow-hidden'
        )}
      >
        {/* Background layer - Glassmorphism 2.0 at offset 0 */}
        <div 
          className={cn(
            'absolute inset-0 rounded-2xl glass-card-v2 transition-all duration-300 pointer-events-none z-0',
            opportunity.featured ? 'bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-amber-500/[0.04]' : ''
          )}
          data-atropos-offset="0"
        />

        {/* Featured Flag badge - Floating at offset 12 */}
        {opportunity.featured && (
          <div 
            className="absolute -top-2.5 left-4 flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 py-0.5 z-20 shadow-md border border-amber-400/35"
            data-atropos-offset="12"
          >
            <Sparkles className="h-3 w-3 text-white" />
            <span className="text-xs font-semibold text-white">Featured</span>
          </div>
        )}

        {/* Content Renderers */}
        <div className="relative z-10 flex flex-col flex-1 h-full">
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
      </div>
    </Atropos>
  );
}

