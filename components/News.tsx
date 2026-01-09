'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from './ui/FadeIn';
import { SpotlightCard } from './ui/SpotlightCard';
import { Language, NewsItem } from '@/types';
import { translations } from '@/lib/translations';
import { wpApi } from '@/lib/wpApi';

interface NewsProps {
  lang: Language;
}

export const News: React.FC<NewsProps> = ({ lang }) => {
  const t = translations[lang].news;

  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fallbackImages = [
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1533929736472-594e69cd291e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1598899134739-96c41f04109a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=800",
  ];

  const staticNewsItems: NewsItem[] = t.items.map((item, idx) => ({
    id: idx + 1,
    title: item.title,
    image: fallbackImages[idx % fallbackImages.length],
    link: "#"
  }));

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(false);
      
      try {
        const fetchedPosts = await wpApi.getNews(lang, 4);

        if (!fetchedPosts || fetchedPosts.length === 0) {
            setPosts(staticNewsItems);
        } else {
            // Apply fallback images if missing
            const postsWithImages = fetchedPosts.map((post, index) => ({
                ...post,
                image: post.image || fallbackImages[index % fallbackImages.length]
            }));
            setPosts(postsWithImages);
        }
      } catch (err) {
        setError(true);
        setPosts(staticNewsItems);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [lang]);

  return (
    <section id="news" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase text-slate-900 dark:text-white">
              {t.title.first} <span className="text-gold-500">{t.title.highlight}</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-lg">{t.desc}</p>
          </FadeIn>
          <FadeIn delay={200}>
            <Link href="/news" className="hidden md:flex items-center px-6 py-3 rounded-full border border-gold-500 text-gold-600 dark:text-gold-400 font-bold uppercase text-sm tracking-wider hover:bg-gold-500 hover:text-white transition-all mt-4 md:mt-0">
              {t.moreBtn} <ArrowRight size={16} className="ml-2" />
            </Link>
          </FadeIn>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-gold-500 w-12 h-12" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {posts.map((item, idx) => (
              <FadeIn key={item.id} delay={idx * 100}>
                <SpotlightCard className="rounded-2xl glass-card h-full group cursor-pointer">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full flex flex-col">
                    <article className="h-full flex flex-col">
                      <div className="overflow-hidden aspect-[4/3] relative">
                        <div className="absolute inset-0 bg-cinema-950/20 group-hover:bg-transparent transition-colors z-10"></div>
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                      </div>
                      <div className="p-6 flex flex-col flex-grow bg-white/40 dark:bg-white/5 group-hover:bg-white/60 dark:group-hover:bg-white/10 transition-colors">
                        {item.date && (
                           <span className="text-xs text-gold-500 font-mono mb-2 block opacity-80">{item.date}</span>
                        )}
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-gold-500 transition-colors line-clamp-3 mb-4">{item.title}</h3>
                        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/10 flex justify-between items-center">
                          <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">{t.title.highlight}</span>
                          <span className="text-xs text-gold-500 uppercase tracking-wider font-bold group-hover:translate-x-1 transition-transform flex items-center">
                            {t.readBtn} <ArrowRight size={12} className="ml-1" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </a>
                </SpotlightCard>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};