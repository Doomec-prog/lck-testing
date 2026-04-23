'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Language, NewsItem } from '@/types';
import { translations } from '@/lib/translations';

interface NewsInfiniteGridProps {
  lang: Language;
  initialPosts: NewsItem[];
  initialHasMore: boolean;
  perPage: number;
}

const fallbackImages = [
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1533929736472-594e69cd291e?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1598899134739-96c41f04109a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=800',
];

const withFallbackImage = (post: NewsItem, index: number): NewsItem => ({
  ...post,
  image: post.image || fallbackImages[index % fallbackImages.length],
});

export function NewsInfiniteGrid({ lang, initialPosts, initialHasMore, perPage }: NewsInfiniteGridProps) {
  const [posts, setPosts] = useState<NewsItem[]>(() => initialPosts.map(withFallbackImage));
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError('');

    try {
      const nextPage = page + 1;
      const response = await fetch(`/api/news?lang=${lang}&page=${nextPage}&perPage=${perPage}`);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json() as { items: NewsItem[]; hasMore: boolean; page: number };
      setPosts(prev => {
        const deduped = data.items.filter(item => !prev.some(existing => existing.id === item.id));
        return [...prev, ...deduped.map((item, idx) => withFallbackImage(item, prev.length + idx))];
      });
      setPage(data.page);
      setHasMore(data.hasMore);
    } catch {
      setError(translations[lang].news.loadMoreError);
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, isLoading, lang, page, perPage]);

  useEffect(() => {
    const target = observerRef.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const emptyState = useMemo<NewsItem[] | null>(() => {
    if (posts.length > 0) return null;
    return translations[lang].news.items.map((item, index) => ({
      id: index + 1,
      title: item.title,
      image: fallbackImages[index % fallbackImages.length],
      link: '#',
    }));
  }, [lang, posts.length]);

  const itemsToRender = emptyState ?? posts;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {itemsToRender.map((item, idx) => (
          <FadeIn key={item.id} delay={idx * 50}>
            <SpotlightCard className="rounded-2xl glass-card h-full group cursor-pointer flex flex-col">
              <Link href={item.link} className="flex flex-col h-full">
                <div className="overflow-hidden aspect-video relative rounded-t-2xl">
                  <div className="absolute inset-0 bg-cinema-950/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow bg-white/40 dark:bg-white/5 group-hover:bg-white/60 dark:group-hover:bg-white/10 transition-colors rounded-b-2xl">
                  {item.date && (
                    <span className="text-xs text-gold-500 font-mono mb-2 block opacity-80">{item.date}</span>
                  )}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-gold-500 transition-colors mb-4">{item.title}</h3>
                  {item.excerpt && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">{item.excerpt}</p>
                  )}
                  <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/10 flex justify-between items-center">
                    <span className="text-xs text-gold-500 uppercase tracking-wider font-bold group-hover:translate-x-1 transition-transform flex items-center ml-auto">
                      {translations[lang].news.readBtn} <ArrowRight size={12} className="ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </SpotlightCard>
          </FadeIn>
        ))}
      </div>

      {!emptyState && (
        <>
          <div ref={observerRef} className="h-8" aria-hidden="true" />

          {error && (
            <p className="text-center text-sm text-red-400 mt-6">{error}</p>
          )}

          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="px-6 py-3 rounded-full border border-white/20 text-sm font-semibold uppercase tracking-wider text-white hover:border-gold-500/50 hover:text-gold-400 transition-colors disabled:opacity-50"
              >
                {isLoading ? translations[lang].news.loadingMore : translations[lang].news.loadMoreBtn}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
