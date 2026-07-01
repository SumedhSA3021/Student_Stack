// Pure presentational component — no hooks, renders on server

import { TrendingUp, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { Metrics } from '@/lib/opportunities';
import { cn } from '@/lib/utils';

interface KpiStripProps {
  data: Metrics;
}

const metrics = [
  { key: 'total', label: 'Total Listings', icon: TrendingUp, color: 'cyan', bgGradient: 'from-cyan-500/20 to-cyan-500/5' },
  { key: 'claimed', label: 'Claimed', icon: CheckCircle, color: 'emerald', bgGradient: 'from-emerald-500/20 to-emerald-500/5' },
  { key: 'closingSoon', label: 'Closing Soon', icon: Clock, color: 'rose', bgGradient: 'from-rose-500/20 to-rose-500/5' },
  { key: 'featured', label: 'Featured', icon: Sparkles, color: 'amber', bgGradient: 'from-amber-500/20 to-amber-500/5' },
] as const;

const colorClasses: Record<string, { icon: string; text: string; border: string }> = {
  cyan: { icon: 'text-cyan-400', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  emerald: { icon: 'text-emerald-400', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  rose: { icon: 'text-rose-400', text: 'text-rose-400', border: 'border-rose-500/30' },
  amber: { icon: 'text-amber-400', text: 'text-amber-400', border: 'border-amber-500/30' },
};

export function KpiStrip({ data }: KpiStripProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
      {metrics.map(metric => {
        const value = data[metric.key];
        const colors = colorClasses[metric.color];

        return (
          <div
            key={metric.key}
            className={cn(
              'group relative overflow-hidden rounded-xl border border-border bg-card/45 backdrop-blur-sm p-4 lg:p-5 transition-all duration-300',
              'hover:border-border/80 hover:bg-card/70 shadow-sm'
            )}
          >
            {/* Gradient Background */}
            <div
              className={cn(
                'absolute inset-0 opacity-50 bg-gradient-to-br',
                metric.bgGradient,
                'transition-opacity duration-300 group-hover:opacity-70'
              )}
            />

            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg bg-accent/60',
                  'border border-border/80'
                )}>
                  <metric.icon className={cn('h-4 w-4', colors.icon)} />
                </div>
                <span className="text-xs font-semibold text-muted-foreground/85 uppercase tracking-wider">
                  {metric.label}
                </span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className={cn('text-2xl lg:text-3xl font-bold', colors.text)}>
                  {value}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
