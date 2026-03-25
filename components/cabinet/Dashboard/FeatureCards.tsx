'use client';

import React from 'react';

const FEATURES = [
    {
        icon: '🎬',
        title: 'Цифровая карта',
        description: 'Ваш цифровой ID члена Лиги с QR-кодом для верификации.',
        tag: 'Скоро',
        tagColor: 'text-gold-400 bg-gold-500/10',
    },
    {
        icon: '💳',
        title: 'Членские взносы',
        description: 'Отслеживайте статус оплаты и историю взносов.',
        tag: 'Скоро',
        tagColor: 'text-gold-400 bg-gold-500/10',
    },
    {
        icon: '🤝',
        title: 'Нетворкинг',
        description: 'Ищите коллег по профессии для совместных проектов.',
        tag: 'Скоро',
        tagColor: 'text-gold-400 bg-gold-500/10',
    },
    {
        icon: '📅',
        title: 'Мероприятия',
        description: 'Календарь событий, мастер-классов и фестивалей.',
        tag: 'Скоро',
        tagColor: 'text-gold-400 bg-gold-500/10',
    },
    {
        icon: '⚖️',
        title: 'Юридическая поддержка',
        description: 'Шаблоны договоров и консультации для кинематографистов.',
        tag: 'Скоро',
        tagColor: 'text-gold-400 bg-gold-500/10',
    },
    {
        icon: '📦',
        title: 'Ресурсы',
        description: 'Логотипы LCK, бланки, рекомендательные письма.',
        tag: 'Скоро',
        tagColor: 'text-gold-400 bg-gold-500/10',
    },
];

export const FeatureCards = () => {
    return (
        <div>
            <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-4">
                Возможности клуба
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURES.map((feature, idx) => (
                    <div
                        key={feature.title}
                        className="glass-panel rounded-3xl p-6 group hover:border-gold-500/40
                       transition-all duration-500 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] flex flex-col"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        {/* Subtle hover glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/5
                            opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="relative z-10 flex-grow flex flex-col">
                            {/* Header: Title + Tag */}
                            <div className="flex items-start justify-between mb-4">
                                <h4 className="text-white text-base font-semibold tracking-wide drop-shadow-sm group-hover:text-gold-400 transition-colors duration-300">{feature.title}</h4>
                                <span className={`text-[9px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded-full border border-gold-500/20 ${feature.tagColor}`}>
                                    {feature.tag}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-slate-400 text-xs leading-relaxed flex-grow">{feature.description}</p>
                            
                            {/* Bottom Icon */}
                            <div className="mt-6 flex justify-between items-end">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner">
                                    {feature.icon}
                                </div>
                                <div className="text-white/20 group-hover:text-gold-500/50 transition-colors duration-500">
                                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
