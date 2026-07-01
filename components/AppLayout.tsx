'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
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
  Sparkles,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserProfile } from '@/lib/UserProfileContext';
import { useApp } from '@/lib/OpportunityContext';
import { useAuth } from '@/lib/AuthContext';
import { NotificationEngineWidget } from './NotificationEngineWidget';

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
  const { profile } = useUserProfile();
  const { user, signOut } = useAuth();
  const { searchQuery, setSearchQuery } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Mobile Sidebar Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 flex flex-col lg:translate-x-0',
          'duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          'bg-card/85 backdrop-blur-xl border-r border-border/80',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
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
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-1.5 rounded-md hover:bg-accent text-muted-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => {
            const active = currentPath === item.href;
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
          <div className="flex items-center justify-between px-2 py-2.5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center overflow-hidden shrink-0 border border-cyan-500/10">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-sm font-bold text-white uppercase">{profile?.name ? profile.name.charAt(0) : (user?.name ? user.name.charAt(0) : 'S')}</span>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium truncate text-foreground">{profile?.name || user?.name || 'Student'}</span>
                <span className="text-xs text-muted-foreground truncate">{profile?.institutionName || 'StudentStack'}</span>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="p-1.5 rounded-lg hover:bg-rose-500/10 hover:text-rose-500 text-muted-foreground transition-all duration-200 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-border/60 bg-background/80 backdrop-blur-xl">
          <div className="flex h-full items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-accent/60 text-muted-foreground lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-card/60 border border-border/60 w-72 focus-within:border-cyan-500/50 transition-colors">
                <Search className="h-4 w-4 text-muted-foreground/80 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search opportunities..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-muted-foreground/60 hover:text-foreground transition-colors text-xs"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 relative" ref={dropdownRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={cn(
                  'relative p-2 rounded-lg transition-colors',
                  showNotifications ? 'bg-accent/60 text-foreground' : 'hover:bg-accent/60 text-muted-foreground'
                )}
                aria-label="Toggle notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-500" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 md:w-96 z-50 animate-scaleIn origin-top-right">
                  <NotificationEngineWidget />
                </div>
              )}
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
