'use client';

import React from 'react';

interface Props {
    status: string;
    submittedAt?: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: string; bg: string; description: string }> = {
    draft: {
        label: 'Черновик',
        color: 'text-slate-400',
        bg: 'bg-slate-500/10 border-slate-500/20',
        icon: '📝',
        description: 'Заявка не завершена. Вернитесь в раздел подачи.',
    },
    submitted: {
        label: 'На рассмотрении',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/20',
        icon: '⏳',
        description: 'Ваша заявка отправлена и находится на рассмотрении комиссии.',
    },
    approved: {
        label: 'Одобрено',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/20',
        icon: '✅',
        description: 'Поздравляем! Вы приняты в Лигу Кинематографистов.',
    },
    rejected: {
        label: 'Отклонено',
        color: 'text-red-400',
        bg: 'bg-red-500/10 border-red-500/20',
        icon: '❌',
        description: 'К сожалению, ваша заявка была отклонена. Свяжитесь с нами для уточнений.',
    },
    changes_requested: {
        label: 'Требуются изменения',
        color: 'text-orange-400',
        bg: 'bg-orange-500/10 border-orange-500/20',
        icon: '✏️',
        description: 'Комиссия просит вас дополнить или исправить некоторые данные.',
    },
};

export const StatusCard = ({ status, submittedAt }: Props) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.submitted;

    return (
        <div className={`rounded-2xl border p-6 ${config.bg}`}>
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="text-3xl flex-shrink-0 mt-1">{config.icon}</div>

                <div className="flex-1">
                    {/* Status Label */}
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xs uppercase tracking-widest text-slate-500">Статус заявки</h3>
                        <span className={`text-sm font-bold uppercase tracking-wider ${config.color}`}>
                            {config.label}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {config.description}
                    </p>

                    {/* Timeline */}
                    {submittedAt && (
                        <div className="mt-4 pt-3 border-t border-white/5">
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <div className="w-2 h-2 rounded-full bg-gold-500" />
                                <span>Подана: {new Date(submittedAt).toLocaleDateString('ru-RU', {
                                    day: 'numeric', month: 'long', year: 'numeric'
                                })}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
