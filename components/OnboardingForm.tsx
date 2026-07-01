'use client';

import { useState } from 'react';
import { useUserProfile, UserProfile } from '@/lib/UserProfileContext';
import { useAuth } from '@/lib/AuthContext';
import {
  User,
  Phone,
  Mail,
  Building2,
  MapPin,
  GraduationCap,
  BookOpen,
  FileText,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const YEAR_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  '5th Year',
  'Post Graduate',
  'PhD',
];

const BRANCH_OPTIONS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biotechnology',
  'Aerospace Engineering',
  'Data Science',
  'Artificial Intelligence & ML',
  'Other',
];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Chandigarh', 'Puducherry', 'Other',
];

interface FormField {
  key: keyof UserProfile;
  label: string;
  placeholder: string;
  icon: React.ElementType;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  options?: string[];
  required?: boolean;
}

const STEPS: { title: string; subtitle: string; fields: FormField[] }[] = [
  {
    title: 'Personal Details',
    subtitle: 'Let\'s get to know you',
    fields: [
      { key: 'name', label: 'Full Name', placeholder: 'Enter your full name', icon: User, type: 'text', required: true },
      { key: 'mobile', label: 'Mobile Number', placeholder: '+91 98765 43210', icon: Phone, type: 'tel', required: true },
      { key: 'email', label: 'Email Address', placeholder: 'you@college.edu', icon: Mail, type: 'email', required: true },
    ],
  },
  {
    title: 'Institution Info',
    subtitle: 'Tell us about your college',
    fields: [
      { key: 'institutionName', label: 'Institution Name', placeholder: 'e.g. IIT Bombay', icon: Building2, type: 'text', required: true },
      { key: 'institutionCity', label: 'City', placeholder: 'e.g. Mumbai', icon: MapPin, type: 'text', required: true },
      { key: 'institutionState', label: 'State', placeholder: 'Select state', icon: MapPin, type: 'select', options: INDIAN_STATES, required: true },
    ],
  },
  {
    title: 'Academic Details',
    subtitle: 'Your academic background',
    fields: [
      { key: 'year', label: 'Year of Study', placeholder: 'Select year', icon: GraduationCap, type: 'select', options: YEAR_OPTIONS, required: true },
      { key: 'branch', label: 'Branch / Department', placeholder: 'Select branch', icon: BookOpen, type: 'select', options: BRANCH_OPTIONS, required: true },
      { key: 'bio', label: 'Short Bio', placeholder: 'Tell us a bit about yourself, your interests...', icon: FileText, type: 'textarea' },
    ],
  },
];

export function OnboardingForm() {
  const { saveProfile } = useUserProfile();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<UserProfile>({
    name: user?.name || '',
    mobile: '',
    email: user?.email || '',
    institutionName: '',
    institutionCity: '',
    institutionState: '',
    year: '',
    branch: '',
    bio: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof UserProfile, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const currentStep = STEPS[step];

  const updateField = (key: keyof UserProfile, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    // Clear error on edit
    if (errors[key]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Partial<Record<keyof UserProfile, string>> = {};
    for (const field of currentStep.fields) {
      if (field.required && !form[field.key].trim()) {
        newErrors[field.key] = `${field.label} is required`;
      }
      if (field.key === 'email' && form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (field.key === 'mobile' && form.mobile.trim() && !/^[\d\s+\-()]{7,15}$/.test(form.mobile)) {
        newErrors.mobile = 'Please enter a valid mobile number';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      // Final submit
      setSubmitting(true);
      setTimeout(() => {
        saveProfile(form);
      }, 600);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const renderField = (field: FormField) => {
    const Icon = field.icon;
    const hasError = !!errors[field.key];
    const value = form[field.key];

    if (field.type === 'select') {
      return (
        <div key={field.key} className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            {field.label}
            {field.required && <span className="text-cyan-500">*</span>}
          </label>
          <select
            id={`onboarding-${field.key}`}
            value={value}
            onChange={e => updateField(field.key, e.target.value)}
            className={cn(
              'w-full rounded-xl border bg-muted/60 px-4 py-3 text-sm text-foreground outline-none transition-all',
              'focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50',
              'appearance-none cursor-pointer',
              hasError
                ? 'border-rose-500/50 ring-1 ring-rose-500/20'
                : 'border-border/80 hover:border-border'
            )}
          >
            <option value="" className="bg-card text-muted-foreground">{field.placeholder}</option>
            {field.options?.map(opt => (
              <option key={opt} value={opt} className="bg-card text-foreground">{opt}</option>
            ))}
          </select>
          {hasError && <p className="text-xs text-rose-500 flex items-center gap-1">{errors[field.key]}</p>}
        </div>
      );
    }

    if (field.type === 'textarea') {
      return (
        <div key={field.key} className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            {field.label}
          </label>
          <textarea
            id={`onboarding-${field.key}`}
            value={value}
            onChange={e => updateField(field.key, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className={cn(
              'w-full rounded-xl border bg-muted/60 px-4 py-3 text-sm text-foreground outline-none transition-all resize-none',
              'placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50',
              'border-border/80 hover:border-border'
            )}
          />
        </div>
      );
    }

    return (
      <div key={field.key} className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          {field.label}
          {field.required && <span className="text-cyan-500">*</span>}
        </label>
        <input
          id={`onboarding-${field.key}`}
          type={field.type}
          value={value}
          onChange={e => updateField(field.key, e.target.value)}
          placeholder={field.placeholder}
          className={cn(
            'w-full rounded-xl border bg-muted/60 px-4 py-3 text-sm text-foreground outline-none transition-all',
            'placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50',
            hasError
              ? 'border-rose-500/50 ring-1 ring-rose-500/20'
              : 'border-border/80 hover:border-border'
          )}
        />
        {hasError && <p className="text-xs text-rose-500 flex items-center gap-1">{errors[field.key]}</p>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 mb-4 shadow-lg shadow-cyan-500/20">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Welcome to StudentStack</h1>
          <p className="text-muted-foreground text-sm">Set up your profile to get started</p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <button
                onClick={() => { if (i < step) setStep(i); }}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300',
                  i < step
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30 cursor-pointer'
                    : i === step
                      ? 'bg-cyan-500/15 border-2 border-cyan-500 text-cyan-500'
                      : 'bg-card border border-border text-muted-foreground'
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </button>
              {i < STEPS.length - 1 && (
                <div className={cn(
                  'h-0.5 w-8 rounded-full transition-colors duration-300',
                  i < step ? 'bg-cyan-500' : 'bg-border'
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-xl shadow-2xl shadow-black/10 overflow-hidden">
          {/* Step Header */}
          <div className="px-6 pt-6 pb-2">
            <h2 className="text-lg font-semibold text-foreground">{currentStep.title}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{currentStep.subtitle}</p>
          </div>

          {/* Fields */}
          <div className="px-6 py-4 space-y-5">
            {currentStep.fields.map(renderField)}
          </div>

          {/* Actions */}
          <div className="px-6 py-4 border-t border-border/60 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all',
                step === 0
                  ? 'text-muted-foreground/30 cursor-not-allowed'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/40'
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={submitting}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all',
                'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/25',
                'hover:shadow-cyan-500/40 hover:brightness-110',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                submitting && 'animate-pulse'
              )}
            >
              {submitting ? (
                'Setting up...'
              ) : step === STEPS.length - 1 ? (
                <>
                  Get Started
                  <Sparkles className="h-4 w-4" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Progress text */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Step {step + 1} of {STEPS.length}
        </p>
      </div>
    </div>
  );
}
