'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { useUserProfile, UserProfile } from '@/lib/UserProfileContext';
import { useAuth } from '@/lib/AuthContext';
import {
  User, Bell, Moon, Shield, LogOut, Check, Pencil, X, Save,
  Phone, Mail, Building2, MapPin, GraduationCap, BookOpen, FileText,
  Github, RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast, Toaster } from 'sonner';
import { useTheme } from 'next-themes';

export function SettingsContent() {
  const { profile, saveProfile, clearProfile } = useUserProfile();
  const { user, signOut } = useAuth();
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile | null>(null);

  const startEditing = () => {
    if (profile) {
      setEditForm({ ...profile });
      setEditing(true);
    }
  };

  const cancelEditing = () => {
    setEditing(false);
    setEditForm(null);
  };

  const saveEdits = () => {
    if (editForm) {
      // Basic validation
      if (!editForm.name.trim() || !editForm.email.trim() || !editForm.mobile.trim()) {
        toast.error('Name, email, and mobile are required');
        return;
      }
      saveProfile(editForm);
      setEditing(false);
      setEditForm(null);
      toast.success('Profile updated successfully!');
    }
  };

  const updateField = (key: keyof UserProfile, value: string) => {
    if (editForm) {
      setEditForm({ ...editForm, [key]: value });
    }
  };

  const profileFields: { key: keyof UserProfile; label: string; icon: React.ElementType }[] = [
    { key: 'name', label: 'Full Name', icon: User },
    { key: 'mobile', label: 'Mobile Number', icon: Phone },
    { key: 'email', label: 'Email Address', icon: Mail },
    { key: 'institutionName', label: 'Institution', icon: Building2 },
    { key: 'institutionCity', label: 'City', icon: MapPin },
    { key: 'institutionState', label: 'State', icon: MapPin },
    { key: 'year', label: 'Year of Study', icon: GraduationCap },
    { key: 'branch', label: 'Branch', icon: BookOpen },
    { key: 'bio', label: 'Bio', icon: FileText },
  ];

  return (
    <AppLayout currentPath="/settings">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <Shield className="h-6 w-6 text-cyan-500" />
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Manage your profile, preferences, and notifications
          </p>
        </div>

        {/* Profile Section */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Profile</h2>
            {!editing ? (
              <button
                onClick={startEditing}
                className="inline-flex items-center gap-1.5 text-xs text-cyan-500 hover:text-cyan-400 transition-colors font-medium"
              >
                <Pencil className="h-3 w-3" />
                Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={cancelEditing}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3 w-3" />
                  Cancel
                </button>
                <button
                  onClick={saveEdits}
                  className="inline-flex items-center gap-1 text-xs text-emerald-500 hover:text-emerald-400 transition-colors font-medium"
                >
                  <Save className="h-3 w-3" />
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden">
            {/* Profile Header */}
            <div className="flex items-center gap-4 p-4 border-b border-border/60">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-cyan-500/10">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xl font-bold text-white uppercase">
                    {profile?.name ? profile.name.charAt(0) : (user?.name ? user.name.charAt(0) : 'S')}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-foreground truncate">{profile?.name || user?.name || 'Student'}</h3>
                <p className="text-xs text-muted-foreground truncate">{profile?.email || user?.email || '—'}</p>
                <p className="text-xs text-muted-foreground/80 truncate">
                  {profile?.year && profile?.branch
                    ? `${profile.year} · ${profile.branch}`
                    : profile?.year || profile?.branch || ''}
                </p>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="divide-y divide-border/60">
              {profileFields.map(({ key, label, icon: Icon }) => {
                const value = profile?.[key] || '';
                return (
                  <div key={key} className="flex items-center gap-3 px-4 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/60 border border-border shrink-0">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-muted-foreground/90 uppercase tracking-wider">{label}</p>
                      {editing ? (
                        key === 'bio' ? (
                          <textarea
                            value={editForm?.[key] || ''}
                            onChange={e => updateField(key, e.target.value)}
                            rows={2}
                            className="w-full mt-1 bg-muted border border-border rounded-lg px-3 py-1.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-cyan-500/30 resize-none"
                          />
                        ) : (
                          <input
                            type="text"
                            value={editForm?.[key] || ''}
                            onChange={e => updateField(key, e.target.value)}
                            className="w-full mt-1 bg-muted border border-border rounded-lg px-3 py-1.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-cyan-500/30"
                          />
                        )
                      ) : (
                        <p className="text-sm text-foreground truncate">{value || '—'}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Preferences</h2>
          <SettingsToggles />
        </section>

        {/* Categories Section */}
        <section className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Interest Categories</h2>
          <CategorySelection />
        </section>

        {/* Account Section */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Account</h2>
          <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden divide-y divide-border/60">
            {/* OAuth Connected Account Information */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700">
                  {user?.provider === 'github' ? (
                    <Github className="h-4 w-4 text-white" />
                  ) : user?.provider === 'google' ? (
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  ) : (
                    <User className="h-4 w-4 text-cyan-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Connected via {user?.provider === 'github' ? 'GitHub' : user?.provider === 'google' ? 'Google' : 'Guest Account'}
                  </h3>
                  <p className="text-xs text-muted-foreground">Session started on {user?.loginAt || '—'}</p>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-sm text-zinc-300 hover:text-white font-medium transition-colors cursor-pointer shrink-0"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>

            {/* Clear Onboarding Profile Details (starts onboarding again but maintains session) */}
            <button
              onClick={() => {
                clearProfile();
                toast.success('Onboarding details reset — you will see the onboarding setup now.');
              }}
              className="group flex items-center gap-4 p-4 w-full hover:bg-accent/40 transition-colors text-left"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <RefreshCw className="h-4 w-4 text-cyan-500 group-hover:rotate-180 transition-transform duration-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-cyan-500">Reset Onboarding Profile</h3>
                <p className="text-xs text-muted-foreground">Clear current onboarding fields and re-enter them</p>
              </div>
            </button>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground/60">StudentStack v1.0.0</p>
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'bg-card border border-border text-foreground',
        }}
      />
    </AppLayout>
  );
}

function SettingsToggles() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [digest, setDigest] = useState(false);

  const isDark = theme === 'dark';

  const toggles = [
    {
      key: 'notifications',
      label: 'Push Notifications',
      description: 'Get notified about new opportunities',
      icon: Bell,
      value: notifications,
      onChange: (v: boolean) => {
        setNotifications(v);
        toast.success(`Notifications ${v ? 'enabled' : 'disabled'}`);
      },
    },
    {
      key: 'darkMode',
      label: 'Dark Mode',
      description: 'Use dark theme across the app',
      icon: Moon,
      value: isDark,
      onChange: (v: boolean) => {
        setTheme(v ? 'dark' : 'light');
        toast.success(`${v ? 'Dark' : 'Light'} mode enabled`);
      },
    },
    {
      key: 'digest',
      label: 'Weekly Digest',
      description: 'Receive weekly email summary',
      icon: ({ className }: { className?: string }) => (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      value: digest,
      onChange: (v: boolean) => {
        setDigest(v);
        toast.success(`Weekly digest ${v ? 'enabled' : 'disabled'}`);
      },
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden divide-y divide-border/60">
      {toggles.map(toggle => (
        <div key={toggle.key} className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/60 border border-border">
              <toggle.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">{toggle.label}</h3>
              <p className="text-xs text-muted-foreground">{toggle.description}</p>
            </div>
          </div>
          <button
            onClick={() => toggle.onChange(!toggle.value)}
            className={cn(
              'relative h-6 w-11 rounded-full transition-colors',
              toggle.value ? 'bg-cyan-500' : 'bg-muted-foreground/30'
            )}
          >
            <span
              className={cn(
                'absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform',
                toggle.value && 'translate-x-5'
              )}
            />
          </button>
        </div>
      ))}
    </div>
  );
}

function CategorySelection() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Student Packs',
    'Cloud Credits',
    'Hackathons',
    'Internships',
  ]);

  const allCategories = ['Student Packs', 'Cloud Credits', 'Hackathons', 'Internships', 'Courses', 'Tools'];

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => {
      const newValue = prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat];
      toast.success(`${cat} ${prev.includes(cat) ? 'removed from' : 'added to'} preferences`);
      return newValue;
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-4">
      <p className="text-xs text-muted-foreground mb-3">Select categories you want to prioritize</p>
      <div className="flex flex-wrap gap-2">
        {allCategories.map(cat => {
          const isSelected = selectedCategories.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                isSelected
                  ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-400'
                  : 'bg-accent/60 border border-border text-muted-foreground hover:text-foreground'
              )}
            >
              {isSelected && <Check className="h-3 w-3" />}
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
