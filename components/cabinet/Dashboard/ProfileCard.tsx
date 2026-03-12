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
        <div className="glass-panel rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-black/5 dark:border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                    <span className="text-gold-400 text-lg">👤</span>
                </div>
                <div>
                    <h3 className="text-slate-900 dark:text-white font-semibold text-sm">Мой профиль</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs">Данные из вашей заявки</p>
                </div>
            </div>

            {/* Data */}
            <div className="px-6 py-2">
                <InfoRow label="ФИО" value={fullName} />
                <InfoRow label="Город" value={city} />
                <InfoRow label="Email" value={email} />
                <InfoRow label="Телефон" value={phone} />
                <InfoRow label="Специальность" value={profession} />
                <InfoRow label="Образование" value={education} />
            </div>
        </div>
    );
};
