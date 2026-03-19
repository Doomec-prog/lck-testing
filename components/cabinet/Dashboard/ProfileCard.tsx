'use client';

import React from 'react';

interface Props {
    fullName?: string;
    city?: string;
    email?: string;
    phone?: string;
    profession?: string;
    education?: string;
}

const InfoRow = ({ label, value }: { label: string; value?: string }) => {
    if (!value) return null;
    return (
        <div className="flex items-start justify-between py-2.5 border-b border-black/5 dark:border-white/5 last:border-0">
            <span className="text-slate-500 text-sm">{label}</span>
            <span className="text-slate-900 dark:text-white text-sm text-right max-w-[55%]">{value}</span>
        </div>
    );
};

export const ProfileCard = ({ fullName, city, email, phone, profession, education }: Props) => {
    return (
        <div className="h-full glass-panel rounded-3xl overflow-hidden relative group hover:border-gold-500/30 transition-all duration-500 flex flex-col">
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Header */}
            <div className="px-8 py-6 border-b border-black/5 dark:border-white/5 flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-500/20 to-gold-500/5 flex items-center justify-center border border-gold-500/20 shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-500">
                    <span className="text-gold-400 text-xl">👤</span>
                </div>
                <div>
                    <h3 className="text-slate-900 dark:text-white font-semibold text-base tracking-wide uppercase">Профиль</h3>
                    <p className="text-slate-600 dark:text-gold-400/70 text-xs tracking-wider mt-0.5">Карточка резидента</p>
                </div>
            </div>

            {/* Data */}
            <div className="px-8 py-4 flex-grow relative z-10 flex flex-col gap-1">
                <InfoRow label="ФИО" value={fullName} />
                <InfoRow label="Город" value={city} />
                <InfoRow label="Email" value={email} />
                <InfoRow label="Телефон" value={phone} />
                <InfoRow label="Специальность" value={profession} />
                <InfoRow label="Образование" value={education} />
            </div>
            
            {/* Action button at bottom */}
            <div className="p-6 mt-auto relative z-10">
                <button className="w-full py-3 rounded-xl border border-white/10 hover:border-gold-500/50 bg-white/5 hover:bg-gold-500/10 text-white/70 hover:text-gold-400 font-medium text-sm transition-all duration-300">
                    Редактировать
                </button>
            </div>
        </div>
    );
};
