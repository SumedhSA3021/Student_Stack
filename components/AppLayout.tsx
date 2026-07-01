'use client';

import { ReactNode, useState } from 'react';
import {
  LayoutDashboard,
  Gift,
  Calendar,
  Bookmark,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  User,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserProfile } from '@/lib/UserProfileContext';

interface AppLayoutProps {
  children: ReactNode;
  currentPath?: string;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Gift, label: 'Opportunities', href: '/opportunities' },
  { icon: Bookmark, label: 'Saved', href: '/saved' },
  { icon: Calendar, label: 'Calendar', href: '/calendar' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function AppLayout({ children, currentPath = '/' }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile } = useUserProfile();

  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-card/90 backdrop-blur-md border border-border lg:hidden"
      >
        <Menu className="h-5 w-5 text-muted-foreground" />
      </button>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 flex flex-col lg:translate-x-0 transition-transform duration-300',
          'bg-card/85 backdrop-blur-xl border-r border-border/80',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-500">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">StudentStack</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-md hover:bg-accent text-muted-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => {
            const active = isActive(item.href);
            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-accent text-foreground border border-border/50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/40'
                )}
              >
                <item.icon className={cn('h-[18px] w-[18px]', active ? 'text-cyan-500' : '')} />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-border/60">
          <div className="flex items-center gap-3 px-2 py-2.5">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate">{profile?.name || 'Student'}</span>
              <span className="text-xs text-muted-foreground truncate">{profile?.institutionName || 'Student'}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-border/60 bg-background/80 backdrop-blur-xl">
          <div className="flex h-full items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-card/60 border border-border/60 w-72">
                <Search className="h-4 w-4 text-muted-foreground/80" />
                <input
                  type="text"
                  placeholder="Search opportunities..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-accent/60 text-muted-foreground transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
