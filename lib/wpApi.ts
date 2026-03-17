import 'server-only';

import { WPPost, NewsItem, Language, WPAuthor } from '@/types';

const WP_API_BASE = 'https://back.lck.kz/wp-json/wp/v2';

const forceHttps = (url: string | undefined | null): string => {
  if (!url) return '';
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  return url;
};

const decodeHtmlEntities = (text: string): string => {
  const withNamedEntities = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  return withNamedEntities.replace(/&#(\d+);/g, (_, code) =>
    String.fromCharCode(Number(code))
  );
};

const stripHtml = (html: string): string => html.replace(/<[^>]*>/g, '');

const decodeHtml = (html: string): string => decodeHtmlEntities(stripHtml(html));

const extractImageFromContent = (htmlContent: string): string | null => {
  const match = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? null;
};

const normalizePost = (post: WPPost, lang: Language): NewsItem => {
  const cleanTitle = decodeHtml(post.title.rendered.replace(/(<([^>]+)>)/gi, ""));
  
  let imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  if (!imageUrl && post.content?.rendered) {
    imageUrl = extractImageFromContent(post.content.rendered) || '';
  }

  const secureImage = forceHttps(imageUrl);
  
  return {
    id: post.id,
    title: cleanTitle,
    slug: post.slug,
    link: '/news/' + post.slug,
    image: secureImage || '',
    date: new Date(post.date).toLocaleDateString(lang === 'EN' ? 'en-US' : 'ru-RU', {
      day: 'numeric', month: 'long', year: 'numeric'
    }),
    excerpt: post.excerpt?.rendered ? decodeHtml(post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "")) : undefined
  };
};

class WPApiService {
  private getEndpoint(path: string, params: Record<string, string | number> = {}): string {
    const url = new URL(`${WP_API_BASE}/${path}`);
    url.searchParams.append('_embed', 'true');
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, String(params[key]));
    });
    return url.toString();
  }

  private async fetch<T>(path: string, params: Record<string, string | number> = {}): Promise<T> {
    try {
      const response = await fetch(this.getEndpoint(path, params), {
        next: { revalidate: 3600 },
      });
      if (!response.ok) throw new Error(`WP API Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch ${path}:`, error);
      throw error;
    }
  }

  async getPosts(lang: Language, perPage = 4): Promise<NewsItem[]> {
    try {
      const posts = await this.fetch<WPPost[]>('posts', { per_page: perPage });
      return posts.map(p => normalizePost(p, lang));
    } catch (e) {
      return [];
    }
  }

  async getNews(lang: Language, perPage = 4): Promise<NewsItem[]> {
    try {
      const posts = await this.fetch<WPPost[]>('rt-portfolios', { per_page: perPage });
      return posts.map(p => normalizePost(p, lang));
    } catch (e) {
      return [];
    }
  }

  async getProjects(lang: Language, perPage = 10): Promise<NewsItem[]> {
    try {
      const posts = await this.fetch<WPPost[]>('rt-portfolios', { per_page: perPage });
      return posts.map(p => normalizePost(p, lang));
    } catch (e) {
      return [];
    }
  }

  async getAuthors(perPage = 100): Promise<WPAuthor[]> {
    try {
      const users = await this.fetch<any[]>('users', { per_page: perPage });
      return users.map(u => ({
          id: u.id,
          name: u.name,
          link: u.link,
          description: u.description,
          avatar_urls: u.avatar_urls,
          slug: u.slug
      }));
    } catch (e) {
      return [];
    }
  }

  async getPostBySlug(slug: string, lang: Language = 'RU'): Promise<{ post: NewsItem; content: string; image: string } | null> {
    try {
      // Try posts first
      let posts = await this.fetch<WPPost[]>('posts', { slug });
      // Fallback to rt-portfolios (custom post type used for news)
      if (!posts || posts.length === 0) {
        posts = await this.fetch<WPPost[]>('rt-portfolios', { slug });
      }
      if (!posts || posts.length === 0) return null;
      const raw = posts[0];
      const normalized = normalizePost(raw, lang);
      // Sanitize content URLs
      let content = raw.content?.rendered || '';
      content = content.replace(/http:\/\/lck\.kz/g, 'https://lck.kz');
      content = content.replace(/http:\/\/back\.lck\.kz/g, 'https://back.lck.kz');
      return {
        post: normalized,
        content,
        image: normalized.image,
      };
    } catch (e) {
      console.error(`Error fetching post by slug "${slug}":`, e);
      return null;
    }
  }

  async getPageBySlug(slug: string): Promise<WPPost | null> {
    try {
      const pages = await this.fetch<WPPost[]>('pages', { slug });
      if (pages && pages.length > 0) {
        const page = pages[0];
        if (page.content && page.content.rendered) {
           page.content.rendered = page.content.rendered.replace(/http:\/\/lck\.kz/g, 'https://lck.kz');
           page.content.rendered = page.content.rendered.replace(/http:\/\/back\.lck\.kz/g, 'https://back.lck.kz');
        }
        return page;
      }
      return null;
    } catch (e) {
      console.error(`Error fetching page ${slug}:`, e);
      return null;
    }
  }
}

export const wpApi = new WPApiService();
