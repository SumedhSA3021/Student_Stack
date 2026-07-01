'use client';

import { Bell, TrendingUp, Calendar, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp, isClosingSoon } from '@/lib/OpportunityContext';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

interface DerivedNotification {
  id: string;
  type: 'new' | 'deadline' | 'update' | 'alert';
  title: string;
  description: string;
  time: string;
}

const typeConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  new: { icon: TrendingUp, color: 'emerald' },
  deadline: { icon: Calendar, color: 'rose' },
  update: { icon: Sparkles, color: 'cyan' },
  alert: { icon: Clock, color: 'amber' },
};

const colorClasses: Record<string, { bg: string; icon: string; text: string }> = {
  emerald: { bg: 'bg-emerald-500/10', icon: 'text-emerald-400', text: 'text-emerald-400' },
  rose: { bg: 'bg-rose-500/10', icon: 'text-rose-400', text: 'text-rose-400' },
  cyan: { bg: 'bg-cyan-500/10', icon: 'text-cyan-400', text: 'text-cyan-400' },
  amber: { bg: 'bg-amber-500/10', icon: 'text-amber-400', text: 'text-amber-400' },
};

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

function getDaysUntil(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  return Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function NotificationEngineWidget() {
  const { opportunities, setSearchQuery } = useApp();
  const router = useRouter();

  const handleNotificationClick = (notification: DerivedNotification) => {
    if (notification.id === 'claimed-summary') {
      router.push('/saved');
      return;
    }

    // Extract the opportunity ID from the notification ID (e.g. deadline-123 -> 123)
    const typeIdParts = notification.id.split('-');
    const oppId = typeIdParts.slice(1).join('-');
    const opp = opportunities.find(o => o.id === oppId);

    if (opp) {
      setSearchQuery(opp.title);
      router.push('/opportunities');
    }
  };

  const notifications = useMemo<DerivedNotification[]>(() => {
    const items: DerivedNotification[] = [];

    // Find opportunities closing soon (deadline-based alerts)
    opportunities
      .filter(opp => opp.deadline && isClosingSoon(opp.deadline))
      .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
      .slice(0, 2)
      .forEach(opp => {
        const days = getDaysUntil(opp.deadline!);
        items.push({
          id: `deadline-${opp.id}`,
          type: 'deadline',
          title: `${opp.title.slice(0, 28)}${opp.title.length > 28 ? '…' : ''}`,
          description: days <= 1 ? 'Closes tomorrow!' : `Closes in ${days} days`,
          time: `${days}d left`,
        });
      });

    // Featured opportunities as highlights
    opportunities
      .filter(opp => opp.featured && !opp.claimed)
      .slice(0, 1)
      .forEach(opp => {
        items.push({
          id: `featured-${opp.id}`,
          type: 'update',
          title: `${opp.title.slice(0, 28)}${opp.title.length > 28 ? '…' : ''}`,
          description: opp.value ? `Worth ${opp.value}` : 'Featured opportunity available',
          time: getRelativeTime(opp.createdAt),
        });
      });

    // Recently added (newest by createdAt)
    opportunities
      .filter(opp => !opp.featured)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 2)
      .forEach(opp => {
        items.push({
          id: `new-${opp.id}`,
          type: 'new',
          title: `${opp.title.slice(0, 28)}${opp.title.length > 28 ? '…' : ''}`,
          description: `New ${opp.category.replace('-', ' ')} from ${opp.provider}`,
          time: getRelativeTime(opp.createdAt),
        });
      });

    // If there are claimed opportunities, add an alert
    const claimedCount = opportunities.filter(opp => opp.claimed).length;
    if (claimedCount > 0) {
      items.push({
        id: 'claimed-summary',
        type: 'alert',
        title: 'Claims Summary',
        description: `You've claimed ${claimedCount} opportunit${claimedCount === 1 ? 'y' : 'ies'}`,
        time: 'Today',
      });
    }

    return items.slice(0, 5);
  }, [opportunities]);

  return (
    <div className="rounded-xl border border-border bg-card dark:bg-zinc-900 shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">Activity Feed</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {notifications.length} updates
        </span>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-border/50">
        {notifications.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="text-xs text-muted-foreground/60">No activity yet</p>
          </div>
        ) : (
          notifications.map(notification => {
            const config = typeConfig[notification.type];
            const colors = colorClasses[config.color];
            const Icon = config.icon;

            return (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className="group flex items-start gap-3 px-5 py-3.5 hover:bg-accent/40 transition-colors cursor-pointer"
              >
                {/* Icon */}
                <div className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg shrink-0',
                  colors.bg
                )}>
                  <Icon className={cn('h-4 w-4', colors.icon)} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-sm font-medium text-foreground truncate">
                      {notification.title}
                    </span>
                    <span className="text-[11px] text-muted-foreground/80 flex-shrink-0">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {notification.description}
                  </p>
                </div>

                {/* Arrow */}
                <ChevronRight className="h-4 w-4 text-muted-foreground/65 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border/60">
        <p className="w-full text-center text-xs text-muted-foreground/60">
          Based on {opportunities.length} opportunities
        </p>
      </div>
    </div>
  );
}
