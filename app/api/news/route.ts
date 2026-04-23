import { NextRequest, NextResponse } from 'next/server';
import { wpApi } from '@/lib/wpApi';
import { Language } from '@/types';

const isLanguage = (value: string): value is Language => value === 'RU' || value === 'KZ' || value === 'EN';

const parsePositiveInt = (value: string | null, fallback: number): number => {
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const langParam = (searchParams.get('lang') || 'RU').toUpperCase();
  const lang: Language = isLanguage(langParam) ? langParam : 'RU';

  const page = parsePositiveInt(searchParams.get('page'), 1);
  const rawPerPage = parsePositiveInt(searchParams.get('perPage'), 12);
  const perPage = Math.min(24, rawPerPage);

  const { items, hasMore, totalPages } = await wpApi.getNewsPage(lang, page, perPage);

  return NextResponse.json({
    items,
    page,
    hasMore,
    totalPages,
  });
}
