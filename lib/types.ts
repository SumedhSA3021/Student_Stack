import {
  Gift,
  Cloud,
  Trophy,
  BookOpen,
  Briefcase,
  Code2,
} from 'lucide-react';

export type OpportunityCategory =
  | 'student-packs'
  | 'cloud-credits'
  | 'hackathons'
  | 'internships'
  | 'courses'
  | 'tools';

/** Discriminant for adaptive card rendering variants */
export type EventType = 'seminar' | 'hackathon' | 'discount' | 'general';

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  category: OpportunityCategory;
  provider: string;
  providerLogo?: string;
  value?: string;
  deadline?: string;
  claimed: boolean;
  featured: boolean;
  tags: string[];
  url: string;
  source: string;
  createdAt: string;
  /** Drives adaptive card variant rendering */
  eventType?: EventType;
  /** Speaker name for seminar-type events */
  speaker?: string;
  /** Physical venue for in-person events */
  venue?: string;
  /** Live stream URL for virtual events */
  liveStreamUrl?: string;
  /** Direct registration/signup URL */
  registrationUrl?: string;
}

export interface CategoryInfo {
  id: OpportunityCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'student-packs', label: 'Student Packs', icon: Gift, color: 'emerald' },
  { id: 'cloud-credits', label: 'Cloud Credits', icon: Cloud, color: 'cyan' },
  { id: 'hackathons', label: 'Hackathons', icon: Trophy, color: 'amber' },
  { id: 'internships', label: 'Internships', icon: Briefcase, color: 'rose' },
  { id: 'courses', label: 'Courses', icon: BookOpen, color: 'violet' },
  { id: 'tools', label: 'Tools', icon: Code2, color: 'blue' },
];

export interface ApiOpportunity {
  title: string;
  description?: string;
  url: string;
  start_date?: string;
  end_date?: string;
  event_type?: string;
  source?: string;
  value?: string;
  tags?: string[];
  provider?: string;
}

export interface Metrics {
  total: number;
  claimed: number;
  closingSoon: number;
  featured: number;
}
