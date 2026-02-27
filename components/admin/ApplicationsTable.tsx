'use client';

import React, { useState } from 'react';
import { ApplicationDetail } from './ApplicationDetail';

export interface ApplicationRow {
    id: string;
    user_id: string;
    full_name: string;
    city: string;
    email: string;
    phone: string;
    education: string;
    profession: string;
    filmography_links: string[];
    documents_urls: Record<string, string>;
    status: string;
    created_at: string;
}

interface Props {
    applications: ApplicationRow[];
    onStatusChange: (appId: string, userId: string, newStatus: string) => Promise<void>;
}

const STATUS_BADGE: Record<string, { label: string; cls: string }> = {
    draft: { label: 'Черновик', cls: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
    submitted: { label: 'На рассмотрении', cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    approved: { label: 'Одобрено', cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    rejected: { label: 'Отклонено', cls: 'bg-red-500/10 text-red-400 border-red-500/20' },
    changes_requested: { label: 'Изменения', cls: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
};

const FILTER_OPTIONS = [
    { value: 'all', label: 'Все' },
    { value: 'submitted', label: 'На рассмотрении' },
    { value: 'approved', label: 'Одобрено' },
    { value: 'rejected', label: 'Отклонено' },
];

export const ApplicationsTable = ({ applications, onStatusChange }: Props) => {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedApp, setSelectedApp] = useState<ApplicationRow | null>(null);

    const filtered = applications.filter(app => {
        const matchesFilter = filter === 'all' || app.status === filter;
        const matchesSearch = !search || app.full_name?.toLowerCase().includes(search.toLowerCase())
            || app.city?.toLowerCase().includes(search.toLowerCase())
            || app.profession?.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="flex-1">
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Поиск по имени, городу, профессии..."
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3
                       text-white placeholder-slate-600 text-sm
                       outline-none focus:border-gold-500/50 transition-all duration-300"
                    />
                </div>

                {/* Status filter tabs */}
                <div className="flex gap-1 bg-white/5 rounded-xl p-1">
                    {FILTER_OPTIONS.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => setFilter(opt.value)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium uppercase tracking-wide transition-all duration-300
                ${filter === opt.value
                                    ? 'bg-gold-500 text-black'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="glass-panel rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left px-5 py-4 text-xs uppercase tracking-widest text-slate-500 font-medium">ФИО</th>
                                <th className="text-left px-5 py-4 text-xs uppercase tracking-widest text-slate-500 font-medium hidden md:table-cell">Город</th>
                                <th className="text-left px-5 py-4 text-xs uppercase tracking-widest text-slate-500 font-medium hidden lg:table-cell">Профессия</th>
                                <th className="text-left px-5 py-4 text-xs uppercase tracking-widest text-slate-500 font-medium">Статус</th>
                                <th className="text-left px-5 py-4 text-xs uppercase tracking-widest text-slate-500 font-medium hidden sm:table-cell">Дата</th>
                                <th className="text-right px-5 py-4 text-xs uppercase tracking-widest text-slate-500 font-medium">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-slate-600">
                                        Заявок не найдено
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(app => {
                                    const badge = STATUS_BADGE[app.status] || STATUS_BADGE.draft;
                                    return (
                                        <tr
                                            key={app.id}
                                            className="border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer"
                                            onClick={() => setSelectedApp(app)}
                                        >
                                            <td className="px-5 py-4">
                                                <span className="text-white text-sm font-medium">{app.full_name || '—'}</span>
                                            </td>
                                            <td className="px-5 py-4 hidden md:table-cell">
                                                <span className="text-slate-400 text-sm">{app.city || '—'}</span>
                                            </td>
                                            <td className="px-5 py-4 hidden lg:table-cell">
                                                <span className="text-slate-400 text-sm">{app.profession || '—'}</span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`inline-block text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border ${badge.cls}`}>
                                                    {badge.label}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 hidden sm:table-cell">
                                                <span className="text-slate-500 text-sm">
                                                    {new Date(app.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <button
                                                    onClick={e => { e.stopPropagation(); setSelectedApp(app); }}
                                                    className="text-gold-400 text-sm hover:text-gold-300 transition-colors"
                                                >
                                                    Открыть →
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedApp && (
                <ApplicationDetail
                    app={selectedApp}
                    onClose={() => setSelectedApp(null)}
                    onStatusChange={async (newStatus) => {
                        await onStatusChange(selectedApp.id, selectedApp.user_id, newStatus);
                        setSelectedApp(null);
                    }}
                />
            )}
        </>
    );
};
