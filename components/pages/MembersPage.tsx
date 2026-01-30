import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Language, WPAuthor } from '@/types';
import { translations } from '@/lib/translations';
import { wpApi } from '@/lib/wpApi';

interface MembersPageProps {
  lang: Language;
}

export const MembersPage = async ({ lang }: MembersPageProps) => {
  let members: WPAuthor[] = [];

  try {
    members = await wpApi.getAuthors(100);
  } catch (error) {
    members = [];
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <FadeIn>
           <h1 className="text-4xl md:text-6xl font-display font-bold uppercase text-slate-900 dark:text-white mb-10 text-center">
             {translations[lang].nav.residents}
           </h1>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map((member, idx) => (
            <FadeIn key={member.id} delay={idx * 50}>
              <SpotlightCard className="h-full rounded-2xl glass-panel group text-center p-6">
                 <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-gold-500/50 mb-4 bg-gray-200">
                   {member.avatar_urls?.['96'] ? (
                      <img src={member.avatar_urls['96']} alt={member.name} className="w-full h-full object-cover" />
                   ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gold-500 text-white font-bold text-2xl">
                         {member.name.charAt(0)}
                      </div>
                   )}
                 </div>
                 <h3 className="text-lg font-bold uppercase text-slate-900 dark:text-white mb-2">{member.name}</h3>
                 {member.description && (
                   <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                     {member.description}
                   </p>
                 )}
              </SpotlightCard>
            </FadeIn>
          ))}
          
          {members.length === 0 && (
             <div className="col-span-full text-center text-slate-500">
               No members found.
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
