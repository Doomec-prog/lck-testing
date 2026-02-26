'use client';

import React from 'react';
import type { WizardData } from './WizardShell';

interface Props {
    data: WizardData;
    updateData: (fields: Partial<WizardData>) => void;
}

const PROFESSIONS = [
    'Режиссёр', 'Продюсер', 'Сценарист', 'Оператор', 'Монтажёр',
    'Звукорежиссёр', 'Художник-постановщик', 'Актёр / Актриса',
    'Каскадёр', 'Композитор', 'Аниматор', 'VFX-художник',
    'Кастинг-директор', 'Второй режиссёр', 'Гримёр', 'Костюмер',
    'Кинокритик', 'Киновед', 'Студент киношколы', 'Другое',
];

export const StepProfessional = ({ data, updateData }: Props) => {
    const addLink = () => {
        updateData({ filmography_links: [...data.filmography_links, ''] });
    };

    const removeLink = (index: number) => {
        const updated = data.filmography_links.filter((_, i) => i !== index);
        updateData({ filmography_links: updated.length ? updated : [''] });
    };

    const updateLink = (index: number, value: string) => {
        const updated = [...data.filmography_links];
        updated[index] = value;
        updateData({ filmography_links: updated });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-2xl md:text-3xl font-display uppercase text-white mb-2">
                    Профессиональные данные
                </h2>
                <p className="text-slate-400 text-sm">
                    Расскажите о вашей деятельности в кинематографе.
                </p>
            </div>

            {/* Profession */}
            <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                    Основная специальность <span className="text-gold-500">*</span>
                </label>
                <select
                    value={data.profession}
                    onChange={e => updateData({ profession: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5
                     text-white outline-none focus:border-gold-500/50 focus:bg-white/[0.07]
                     transition-all duration-300 appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                >
                    <option value="" className="bg-cinema-900">Выберите специальность</option>
                    {PROFESSIONS.map(p => (
                        <option key={p} value={p} className="bg-cinema-900">{p}</option>
                    ))}
                </select>
            </div>

            {/* Education */}
            <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                    Образование
                </label>
                <input
                    type="text"
                    value={data.education}
                    onChange={e => updateData({ education: e.target.value })}
                    placeholder="КазНАИ им. Жургенова, ВГИК и т.д."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5
                     text-white placeholder-slate-600
                     outline-none focus:border-gold-500/50 focus:bg-white/[0.07]
                     transition-all duration-300"
                />
            </div>

            {/* Filmography Links */}
            <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                    Ссылки на фильмографию
                </label>
                <p className="text-slate-600 text-xs mb-3">IMDb, Kinopoisk, YouTube, портфолио...</p>

                <div className="space-y-3">
                    {data.filmography_links.map((link, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="url"
                                value={link}
                                onChange={e => updateLink(index, e.target.value)}
                                placeholder="https://imdb.com/name/..."
                                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3
                           text-white placeholder-slate-600
                           outline-none focus:border-gold-500/50 focus:bg-white/[0.07]
                           transition-all duration-300 text-sm"
                            />
                            {data.filmography_links.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeLink(index)}
                                    className="w-11 h-11 rounded-xl border border-white/10 bg-white/5
                             text-slate-500 hover:text-red-400 hover:border-red-500/30
                             transition-all duration-300 flex items-center justify-center flex-shrink-0"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addLink}
                    className="mt-3 text-sm text-gold-500 hover:text-gold-400 transition-colors duration-300
                     flex items-center gap-1"
                >
                    <span className="text-lg leading-none">+</span> Добавить ссылку
                </button>
            </div>
        </div>
    );
};
