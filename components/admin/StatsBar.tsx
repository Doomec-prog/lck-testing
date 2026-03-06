'use client';

import React from 'react';

interface Props {
    total: number;
    submitted: number;
    approved: number;
    rejected: number;
}

const statItems = [
    { key: 'total', label: 'Всего', icon: '📋', color: 'text-white', bg: 'bg-white/5 border-white/10' },
    { key: 'submitted', label: 'На рассмотрении', icon: '⏳', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { key: 'approved', label: 'Одобрено', icon: '✅', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { key: 'rejected', label: 'Отклонено', icon: '❌', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
] as const;

export const StatsBar = ({ total, submitted, approved, rejected }: Props) => {
    const values: Record<string, number> = { total, submitted, approved, rejected };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statItems.map(item => (
                <div key={item.key} className={`rounded-2xl border p-4 ${item.bg}`}>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-xs uppercase tracking-widest text-slate-500">{item.label}</span>
                    </div>
                    <p className={`text-3xl font-bold ${item.color}`}>{values[item.key]}</p>
                </div>
            ))}
        </div>
    );
};
