'use client';

import React from 'react';
import { NewsPage as NewsPageComponent } from '../../components/pages/NewsPage';
import { useGlobalContext } from '../../context/GlobalContext';
import { ContactFooter } from '../../components/ContactFooter';

export default function NewsRoute() {
  const { lang } = useGlobalContext();
  
  return (
    <div className="relative z-10">
       <NewsPageComponent lang={lang} />
       <ContactFooter lang={lang} />
    </div>
  );
}