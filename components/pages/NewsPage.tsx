import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { FadeIn } from '../ui/FadeIn';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Language, NewsItem } from '@/types';
import { translations } from '@/lib/translations';
import { wpApi } from '@/lib/wpApi';

interface NewsPageProps {
  lang: Language;
}

export const NewsPage: React.FC<NewsPageProps> = ({ lang }) => {
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fallbackImages = [
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1533929736472-594e69cd291e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1598899134739-96c41f04109a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=800",
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        // Fetch more posts for the dedicated page (e.g. 12)
        const fetchedPosts = await wpApi.getNews(lang, 12);
        const postsWithImages = fetchedPosts.map((post, index) => ({
            ...post,
            image: post.image || fallbackImages[index % fallbackImages.length]
        }));
        setPosts(postsWithImages);
      } catch (err) {
        console.error("Error fetching news page", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [lang]);

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <FadeIn>
           <h1 className="text-4xl md:text-6xl font-display font-bold uppercase text-slate-900 dark:text-white mb-4 text-center">
             {translations[lang].news.title.highlight}
           </h1>
           <p className="text-center text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-16">
              {translations[lang].news.desc}
           </p>
        </FadeIn>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-gold-500 w-12 h-12" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {posts.map((item, idx) => (
              <FadeIn key={item.id} delay={idx * 50}>
                <SpotlightCard className="rounded-2xl glass-card h-full group cursor-pointer flex flex-col">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
                    <div className="overflow-hidden aspect-video relative rounded-t-2xl">
                      <div className="absolute inset-0 bg-cinema-950/20 group-hover:bg-transparent transition-colors z-10"></div>
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow bg-white/40 dark:bg-white/5 group-hover:bg-white/60 dark:group-hover:bg-white/10 transition-colors rounded-b-2xl">
                      {item.date && (
                         <span className="text-xs text-gold-500 font-mono mb-2 block opacity-80">{item.date}</span>
                      )}
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-gold-500 transition-colors mb-4">{item.title}</h3>
                      {item.excerpt && (
                          <div className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: item.excerpt }} />
                      )}
                      <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/10 flex justify-between items-center">
                        <span className="text-xs text-gold-500 uppercase tracking-wider font-bold group-hover:translate-x-1 transition-transform flex items-center ml-auto">
                          {translations[lang].news.readBtn} <ArrowRight size={12} className="ml-1" />
                        </span>
                      </div>
                    </div>
                  </a>
                </SpotlightCard>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};