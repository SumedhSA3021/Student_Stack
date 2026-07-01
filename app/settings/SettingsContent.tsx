'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { useUserProfile, UserProfile } from '@/lib/UserProfileContext';
import {
  User, Bell, Moon, Shield, LogOut, Check, Pencil, X, Save,
  Phone, Mail, Building2, MapPin, GraduationCap, BookOpen, FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast, Toaster } from 'sonner';
import { useTheme } from 'next-themes';

export function SettingsContent() {
  const { profile, saveProfile, clearProfile } = useUserProfile();
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
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-xl font-bold text-white shrink-0 shadow-sm">
                {profile?.name ? profile.name.charAt(0).toUpperCase() : <User className="h-6 w-6" />}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-foreground truncate">{profile?.name || 'Student'}</h3>
                <p className="text-xs text-muted-foreground truncate">{profile?.email || '—'}</p>
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
          <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden">
            <button
              onClick={() => {
                clearProfile();
                toast.success('Profile cleared — you\'ll see the onboarding screen on next load');
              }}
              className="group flex items-center gap-4 p-4 w-full hover:bg-accent/40 transition-colors"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10 border border-rose-500/20">
                <LogOut className="h-4 w-4 text-rose-500" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-sm font-medium text-rose-500">Reset Profile</h3>
                <p className="text-xs text-muted-foreground">Clear your profile and start over</p>
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
