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

const markdownToHtml = (markdown: string): string => {
  const normalized = markdown
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t');

  const withImages = normalized.replace(
    /!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g,
    '<img src="$2" alt="$1" />'
  );

  const withLinks = withImages.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  const withHeadings = withLinks
    .replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
    .replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

  const paragraphs = withHeadings
    .split(/\n{2,}/)
    .map(block => block.trim())
    .filter(Boolean)
    .map(block => {
      if (/^<h[1-3]>|^<img|^<ul>|^<ol>|^<blockquote>/.test(block)) {
        return block;
      }
      return `<p>${block.replace(/\n/g, '<br />')}</p>`;
    });

  return paragraphs.join('\n');
};

const normalizePostContent = (content: string): string => {
  if (!content) return '';

  const fixedUrls = content
    .replace(/http:\/\/lck\.kz/g, 'https://lck.kz')
    .replace(/http:\/\/back\.lck\.kz/g, 'https://back.lck.kz');

  const unescaped = fixedUrls
    .replace(/\\\\/g, '\\')
    .replace(/\\([\[\]()`*_#+!\\])/g, '$1');

  const hasHtmlTags = /<\/?[a-z][\s\S]*>/i.test(unescaped);
  if (hasHtmlTags) {
    return unescaped;
  }

  const looksLikeMarkdown = /\[[^\]]+\]\(https?:\/\//.test(unescaped) || /!\[[^\]]*\]\(https?:\/\//.test(unescaped) || /^#{1,3}\s+/m.test(unescaped);
  if (looksLikeMarkdown) {
    return markdownToHtml(unescaped);
  }

  return `<p>${unescaped.replace(/\n/g, '<br />')}</p>`;
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
    const response = await fetch(this.getEndpoint(path, params), {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`WP API Error: ${response.statusText}`);
    }

    return await response.json();
  }

  async getNewsPage(lang: Language, page = 1, perPage = 12): Promise<{ items: NewsItem[]; hasMore: boolean; totalPages: number }> {
    try {
      const response = await fetch(this.getEndpoint('posts', { per_page: perPage, page }), {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`WP API Error: ${response.statusText}`);
      }

      const posts = await response.json() as WPPost[];
      const totalPages = Number(response.headers.get('X-WP-TotalPages') || '1');

      return {
        items: posts.map(p => normalizePost(p, lang)),
        hasMore: page < totalPages,
        totalPages,
      };
    } catch (e) {
      console.error(`Failed to fetch paginated news page ${page}:`, e);
      return { items: [], hasMore: false, totalPages: 1 };
    }
  }

  async getPosts(lang: Language, perPage = 4): Promise<NewsItem[]> {
    try {
      const { items } = await this.getNewsPage(lang, 1, perPage);
      return items;
    } catch (e) {
      return [];
    }
  }

  async getNews(lang: Language, perPage = 4): Promise<NewsItem[]> {
    try {
      const { items } = await this.getNewsPage(lang, 1, perPage);
      return items;
    } catch (e) {
      return [];
    }
  }

  async getProjects(lang: Language, perPage = 10): Promise<NewsItem[]> {
    return [];
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
      const posts = await this.fetch<WPPost[]>('posts', { slug });

      if (!posts || posts.length === 0) {
        return null;
      }

      const raw = posts[0];
      const normalized = normalizePost(raw, lang);
      const content = normalizePostContent(raw.content?.rendered || '');

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
