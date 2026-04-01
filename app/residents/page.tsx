import React from 'react';
import { MembersPage as MembersPageComponent } from '../../components/pages/MembersPage';
import { ContactFooter } from '../../components/ContactFooter';
import { getServerLanguage } from '@/lib/getLanguage';

export default async function MembersRoute() {
  const lang = await getServerLanguage();

  return (
    <div className="relative z-10">
      <MembersPageComponent lang={lang} />
      <ContactFooter lang={lang} />
    </div>
  );
}
