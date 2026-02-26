export interface NavItem {
  label: string;
  href: string;
}

export interface NewsItem {
  id: number;
  title: string;
  image: string;
  link: string;
  date?: string;
  excerpt?: string;
}

export interface ActivityItem {
  title: string;
  description: string;
}

export interface ProjectStat {
  value: string;
  label: string;
}

export type Language = 'RU' | 'KZ' | 'EN';
export type Theme = 'light' | 'dark' | 'noir';

// WordPress Types
export interface WPPost {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'author'?: Array<WPAuthor>;
    'wp:term'?: Array<Array<WPTaxonomy>>;
  };
}

export interface WPAuthor {
  id: number;
  name: string;
  link: string;
  description?: string;
  avatar_urls?: {
    [key: string]: string;
  };
  slug?: string;
}

export interface WPTaxonomy {
  id: number;
  name: string;
  link: string;
  taxonomy: string;
}

// Personal Cabinet Types
export type UserStatus = 'applicant' | 'member' | 'admin';
export type ApplicationStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'changes_requested';

export interface UserProfile {
  id: string; // matches auth.users id
  full_name?: string;
  city?: string;
  avatar_url?: string;
  status: UserStatus;
  membership_id?: string;
  updated_at?: string;
}

export interface ApplicationDraft {
  id?: string;
  user_id: string;
  full_name: string;
  city: string;
  email: string;
  phone: string;
  education?: string;
  profession?: string;
  filmography_links?: string[]; // stored as JSONB
  documents_urls?: Record<string, string>; // { "id_card": "url", ... }
  status: ApplicationStatus;
  created_at?: string;
  updated_at?: string;
}