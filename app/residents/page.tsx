'use client';

import React from 'react';
import { MembersPage as MembersPageComponent } from '../../components/pages/MembersPage';
import { useGlobalContext } from '../../context/GlobalContext';
import { ContactFooter } from '../../components/ContactFooter';

export default function MembersRoute() {
  const { lang } = useGlobalContext();

  return (
    <div className="relative z-10">
      <MembersPageComponent lang={lang} />
      <ContactFooter lang={lang} />
    </div>
  );
}