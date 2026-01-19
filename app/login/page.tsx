import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { getServerLanguage } from '@/lib/getLanguage';

export default function LoginPage() {
  const lang = getServerLanguage();

  return (
    <div className="relative z-10 pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <LoginForm lang={lang} />
      </div>
    </div>
  );
}
