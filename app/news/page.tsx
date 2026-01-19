import React from 'react';
import { NewsPage as NewsPageComponent } from '../../components/pages/NewsPage';
import { ContactFooter } from '../../components/ContactFooter';
import { getServerLanguage } from '@/lib/getLanguage';

export default function NewsRoute() {
  const lang = getServerLanguage();
  
  return (
    <div className="relative z-10">
       <NewsPageComponent lang={lang} />
       <ContactFooter lang={lang} />
    </div>
  );
}
