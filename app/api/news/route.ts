import { NextRequest, NextResponse } from 'next/server';
import { wpApi } from '@/lib/wpApi';
import { Language } from '@/types';

const isLanguage = (value: string): value is Language => value === 'RU' || value === 'KZ' || value === 'EN';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const langParam = (searchParams.get('lang') || 'RU').toUpperCase();
  const lang: Language = isLanguage(langParam) ? langParam : 'RU';
  const page = Math.max(1, Number(searchParams.get('page') || '1'));
  const perPage = Math.min(24, Math.max(1, Number(searchParams.get('perPage') || '12')));

  const { items, hasMore, totalPages } = await wpApi.getNewsPage(lang, page, perPage);

  return NextResponse.json({
    items,
    page,
    hasMore,
    totalPages,
  });
}
