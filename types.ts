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