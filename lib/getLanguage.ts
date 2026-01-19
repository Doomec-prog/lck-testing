import { cookies, headers } from 'next/headers';
import { Language } from '@/types';

const SUPPORTED_LANGUAGES = new Set<Language>(['RU', 'KZ', 'EN']);

const normalizeLanguage = (value?: string | null): Language | null => {
  if (!value) return null;
  const upper = value.toUpperCase();
  if (SUPPORTED_LANGUAGES.has(upper as Language)) {
    return upper as Language;
  }
  return null;
};

const mapBrowserLanguage = (value?: string | null): Language | null => {
  if (!value) return null;
  const primary = value.split(',')[0]?.trim().toLowerCase();
  if (!primary) return null;
  if (primary.startsWith('ru')) return 'RU';
  if (primary.startsWith('kk') || primary.startsWith('kz')) return 'KZ';
  if (primary.startsWith('en')) return 'EN';
  return null;
};

export const getServerLanguage = (): Language => {
  const cookieLang = normalizeLanguage(cookies().get('lang')?.value);
  if (cookieLang) return cookieLang;

  const headerLang = mapBrowserLanguage(headers().get('accept-language'));
  if (headerLang) return headerLang;

  return 'RU';
};
