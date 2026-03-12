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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {FEATURES.map(feature => (
                    <div
                        key={feature.title}
                        className="glass-card rounded-2xl p-5 group hover:border-gold-500/20
                       transition-all duration-300 cursor-default relative overflow-hidden"
                    >
                        {/* Subtle hover glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/0
                            group-hover:from-gold-500/5 group-hover:to-transparent
                            transition-all duration-500 pointer-events-none" />

                        <div className="relative">
                            {/* Icon + Tag */}
                            <div className="flex items-start justify-between mb-3">
                                <span className="text-2xl">{feature.icon}</span>
                                <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full ${feature.tagColor}`}>
                                    {feature.tag}
                                </span>
                            </div>

                            {/* Title */}
                            <h4 className="text-slate-900 dark:text-white text-sm font-semibold mb-1.5">{feature.title}</h4>

                            {/* Description */}
                            <p className="text-slate-500 text-xs leading-relaxed">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
