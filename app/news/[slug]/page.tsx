import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { wpApi } from '@/lib/wpApi';
import { getServerLanguage } from '@/lib/getLanguage';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { slug: string };
}

export default async function NewsPostPage({ params }: PageProps) {
  const lang = await getServerLanguage();
  const result = await wpApi.getPostBySlug(params.slug, lang);

  if (!result) {
    notFound();
  }

  const { post, content, image } = result;

  return (
    <div className="min-h-screen bg-black">
      {/* Back Navigation */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/news"
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full
                     bg-black/60 backdrop-blur-md border border-white/10
                     text-sm text-slate-300 hover:text-gold-400 hover:border-gold-500/30
                     transition-all duration-300"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-semibold uppercase tracking-wider text-xs">
            {lang === 'RU' ? 'Новости' : lang === 'KZ' ? 'Жаңалықтар' : 'News'}
          </span>
        </Link>
      </div>

      {/* Hero Image */}
      {image && (
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
          <Image
            src={image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Fade to black gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-5xl mx-auto">
            {post.date && (
              <span className="inline-block text-xs font-mono text-gold-500 tracking-widest uppercase mb-4 opacity-80">
                {post.date}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold uppercase text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      )}

      {/* No-image fallback header */}
      {!image && (
        <div className="pt-32 pb-12 px-8 md:px-16 max-w-5xl mx-auto">
          {post.date && (
            <span className="inline-block text-xs font-mono text-gold-500 tracking-widest uppercase mb-4 opacity-80">
              {post.date}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold uppercase text-white leading-tight">
            {post.title}
          </h1>
        </div>
      )}

      {/* Article Content */}
      <div className="relative bg-[#1A1A1A]">
        {/* Top edge gradient */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none" />

        <article
          className="
            prose prose-invert prose-lg
            max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24
            prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wider
            prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
            prose-p:text-slate-300 prose-p:leading-relaxed
            prose-a:text-[#D4AF37] prose-a:no-underline hover:prose-a:text-[#E8C547] prose-a:transition-colors
            prose-strong:text-white
            prose-blockquote:border-l-[#D4AF37] prose-blockquote:text-slate-400 prose-blockquote:italic
            prose-img:rounded-2xl prose-img:shadow-2xl
            prose-figure:my-12
            prose-hr:border-white/10
            prose-li:text-slate-300
            prose-code:text-gold-400
          "
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Bottom CTA */}
      <div className="bg-black py-16 text-center">
        <Link
          href="/news"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full
                     border border-white/10 hover:border-gold-500/40
                     text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-gold-400
                     transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/10"
        >
          <ArrowLeft size={16} />
          {lang === 'RU' ? 'Все новости' : lang === 'KZ' ? 'Барлық жаңалықтар' : 'All News'}
        </Link>
      </div>
    </div>
  );
}
