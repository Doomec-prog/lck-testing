'use client';

import React from 'react';
import type { ApplicationRow } from './ApplicationsTable';

interface Props {
    app: ApplicationRow;
    onClose: () => void;
    onStatusChange: (newStatus: string) => Promise<void>;
}

const InfoRow = ({ label, value }: { label: string; value?: string }) => {
    if (!value) return null;
    return (
        <div className="flex justify-between items-start py-2 border-b border-white/5 last:border-0">
            <span className="text-slate-500 text-sm">{label}</span>
            <span className="text-white text-sm text-right max-w-[60%]">{value}</span>
        </div>
    );
};

export const ApplicationDetail = ({ app, onClose, onStatusChange }: Props) => {
    const [loading, setLoading] = React.useState<string | null>(null);

    const handleAction = async (status: string) => {
        setLoading(status);
        try {
            await onStatusChange(status);
        } finally {
            setLoading(null);
        }
    };

    const filledLinks = (app.filmography_links || []).filter(l => l && l.trim());
    const docKeys = Object.keys(app.documents_urls || {});

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative glass-panel rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-cinema-900/90 backdrop-blur-sm px-6 py-5 border-b border-white/5 flex items-center justify-between z-10">
                    <div>
                        <h2 className="text-xl font-display uppercase text-white">{app.full_name || 'Без имени'}</h2>
                        <p className="text-slate-500 text-xs mt-1">ID: {app.id.slice(0, 8)}... | {new Date(app.created_at).toLocaleDateString('ru-RU')}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl border border-white/10 bg-white/5
                       text-slate-400 hover:text-white transition-all flex items-center justify-center"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-6 space-y-6">
                    {/* Personal */}
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-3">Личные данные</h3>
                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                            <InfoRow label="ФИО" value={app.full_name} />
                            <InfoRow label="Город" value={app.city} />
                            <InfoRow label="Email" value={app.email} />
                            <InfoRow label="Телефон" value={app.phone} />
                        </div>
                    </div>

                    {/* Professional */}
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-3">Профессия</h3>
                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                            <InfoRow label="Специальность" value={app.profession} />
                            <InfoRow label="Образование" value={app.education} />
                        </div>
                    </div>

                    {/* Filmography */}
                    {filledLinks.length > 0 && (
                        <div>
                            <h3 className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-3">Фильмография</h3>
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-2">
                                {filledLinks.map((link, i) => (
                                    <a
                                        key={i}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-gold-400 text-sm hover:text-gold-300 truncate transition-colors"
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Documents */}
                    {docKeys.length > 0 && (
                        <div>
                            <h3 className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-3">Документы</h3>
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-2">
                                {docKeys.map(key => (
                                    <div key={key} className="flex items-center justify-between">
                                        <span className="text-slate-300 text-sm capitalize">{key.replace(/_/g, ' ')}</span>
                                        <a
                                            href={app.documents_urls[key]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gold-400 text-xs hover:text-gold-300 transition-colors"
                                        >
                                            Открыть ↗
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="sticky bottom-0 bg-cinema-900/90 backdrop-blur-sm px-6 py-5 border-t border-white/5">
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => handleAction('approved')}
                            disabled={loading !== null || app.status === 'approved'}
                            className="flex-1 px-5 py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm uppercase tracking-widest
                         hover:bg-emerald-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
                        >
                            {loading === 'approved' ? '⏳' : '✅'} Одобрить
                        </button>

                        <button
                            onClick={() => handleAction('rejected')}
                            disabled={loading !== null || app.status === 'rejected'}
                            className="flex-1 px-5 py-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 font-bold text-sm uppercase tracking-widest
                         hover:bg-red-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
                        >
                            {loading === 'rejected' ? '⏳' : '❌'} Отклонить
                        </button>

                        <button
                            onClick={() => handleAction('changes_requested')}
                            disabled={loading !== null}
                            className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 font-bold text-sm uppercase tracking-widest
                         hover:border-orange-500/30 hover:text-orange-400 transition-all disabled:opacity-40
                         flex items-center justify-center gap-2"
                        >
                            ✏️ Изменения
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
