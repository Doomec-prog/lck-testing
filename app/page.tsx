'use client';

import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Benefits } from '../components/Benefits';
import { LeadingOrg } from '../components/LeadingOrg';
import { Activities } from '../components/Activities';
import { UsefulInfo } from '../components/UsefulInfo';
import { ProjectsStats } from '../components/ProjectsStats';
import { News } from '../components/News';
import { CTA } from '../components/CTA';
import { ContactFooter } from '../components/ContactFooter';
import { CinematicMist } from '../components/ui/CinematicMist';
import { useGlobalContext } from '../context/GlobalContext';

export default function Home() {
  const { lang } = useGlobalContext();

  return (
    <div className="relative z-10">
      <main>
        <Hero lang={lang} />
        <CinematicMist />
        <About lang={lang} />
        <CinematicMist />
        <Benefits lang={lang} />
        <LeadingOrg lang={lang} />
        <CinematicMist />
        <Activities lang={lang} />
        <CinematicMist />
        <UsefulInfo lang={lang} />
        <ProjectsStats lang={lang} />
        <News lang={lang} />
        <CinematicMist />
        <CTA lang={lang} />
      </main>
      <ContactFooter lang={lang} />
    </div>
  );
}