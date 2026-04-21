import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { Language } from '@/types';
import { translations } from '@/lib/translations';
import { wpApi } from '@/lib/wpApi';
import { NewsInfiniteGrid } from '@/components/news/NewsInfiniteGrid';

interface NewsPageProps {
  lang: Language;
}

export const NewsPage = async ({ lang }: NewsPageProps) => {
  const perPage = 12;
  const { items, hasMore } = await wpApi.getNewsPage(lang, 1, perPage);

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

        <NewsInfiniteGrid
          lang={lang}
          initialPosts={items}
          initialHasMore={hasMore}
          perPage={perPage}
        />
      </div>
    </div>
  );
};
