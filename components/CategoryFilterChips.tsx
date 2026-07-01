'use client';

import { CATEGORIES, OpportunityCategory } from '@/lib/opportunities';
import { cn } from '@/lib/utils';
import { Video } from 'lucide-react';

interface CategoryFilterChipsProps {
  selected: OpportunityCategory | 'all' | 'seminars';
  onSelect: (category: OpportunityCategory | 'all' | 'seminars') => void;
  counts?: Record<string, number>;
}

const categoryColors: Record<string, { border: string; bg: string; text: string; hoverBg: string }> = {
  'student-packs': { border: 'border-emerald-500/40', bg: 'bg-emerald-500/15', text: 'text-emerald-400', hoverBg: 'hover:bg-emerald-500/20' },
  'cloud-credits': { border: 'border-cyan-500/40', bg: 'bg-cyan-500/15', text: 'text-cyan-400', hoverBg: 'hover:bg-cyan-500/20' },
  'hackathons': { border: 'border-amber-500/40', bg: 'bg-amber-500/15', text: 'text-amber-400', hoverBg: 'hover:bg-amber-500/20' },
  'internships': { border: 'border-rose-500/40', bg: 'bg-rose-500/15', text: 'text-rose-400', hoverBg: 'hover:bg-rose-500/20' },
  'courses': { border: 'border-violet-500/40', bg: 'bg-violet-500/15', text: 'text-violet-400', hoverBg: 'hover:bg-violet-500/20' },
  'tools': { border: 'border-blue-500/40', bg: 'bg-blue-500/15', text: 'text-blue-400', hoverBg: 'hover:bg-blue-500/20' },
};

export function CategoryFilterChips({ selected, onSelect, counts = {} }: CategoryFilterChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* All Option */}
      <button
        onClick={() => onSelect('all')}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200',
          selected === 'all'
            ? 'border-primary/40 bg-accent text-foreground'
            : 'border-border bg-card/60 text-muted-foreground hover:bg-accent/40 hover:text-foreground'
        )}
      >
        All
        <span className={cn(
          'text-xs px-1.5 py-0.5 rounded',
          selected === 'all' ? 'bg-foreground/10 text-foreground' : 'bg-muted text-muted-foreground/60'
        )}>
          {counts['all'] || 0}
        </span>
      </button>

      {/* Category Options */}
      {CATEGORIES.map(category => {
        const colors = categoryColors[category.id];
        const isSelected = selected === category.id;
        const Icon = category.icon;
        const count = counts[category.id] || 0;

        return (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200',
              isSelected
                ? cn(colors.border, colors.bg, colors.text, 'border')
                : 'border-border bg-card/60 text-muted-foreground',
              !isSelected && cn('hover:border-border/80 hover:bg-accent/40 hover:text-foreground')
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {category.label}
            <span className={cn(
              'text-xs px-1.5 py-0.5 rounded',
              isSelected ? 'bg-background/40' : 'bg-muted text-muted-foreground/60'
            )}>
              {count}
            </span>
          </button>
        );
      })}

      {/* Seminars Event-Type Filter */}
      <button
        onClick={() => onSelect('seminars')}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200',
          selected === 'seminars'
            ? 'border-violet-500/40 bg-violet-500/15 text-violet-400 border'
            : 'border-border bg-card/60 text-muted-foreground hover:border-border/80 hover:bg-accent/40 hover:text-foreground'
        )}
      >
        <Video className="h-3.5 w-3.5" />
        Seminars
        <span className={cn(
          'text-xs px-1.5 py-0.5 rounded',
          selected === 'seminars' ? 'bg-background/40' : 'bg-muted text-muted-foreground/60'
        )}>
          {counts['seminars'] || 0}
        </span>
      </button>
    </div>
  );
}
