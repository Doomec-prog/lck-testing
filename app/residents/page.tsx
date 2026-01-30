import React from 'react';
import { MembersPage as MembersPageComponent } from '../../components/pages/MembersPage';
import { ContactFooter } from '../../components/ContactFooter';
import { getServerLanguage } from '@/lib/getLanguage';

export default function MembersRoute() {
  const lang = getServerLanguage();

  return (
    <div className="relative z-10">
      <MembersPageComponent lang={lang} />
      <ContactFooter lang={lang} />
    </div>
  );
}
