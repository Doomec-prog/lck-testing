'use client';

import React from 'react';
import type { WizardData } from './WizardShell';

interface Props {
    data: WizardData;
    updateData: (fields: Partial<WizardData>) => void;
}

const CITIES = [
    'Алматы', 'Астана', 'Шымкент', 'Караганда', 'Актобе',
    'Тараз', 'Павлодар', 'Усть-Каменогорск', 'Семей', 'Атырау',
    'Костанай', 'Кызылорда', 'Уральск', 'Петропавловск', 'Актау',
    'Туркестан', 'Кокшетау', 'Талдыкорган', 'Другой',
];

export const StepPersonal = ({ data, updateData }: Props) => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-2xl md:text-3xl font-display uppercase text-white mb-2">
                    Личные данные
                </h2>
                <p className="text-slate-400 text-sm">
                    Заполните основную информацию о себе.
                </p>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                        ФИО (Полностью) <span className="text-gold-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.full_name}
                        onChange={e => updateData({ full_name: e.target.value })}
                        placeholder="Иванов Иван Иванович"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5
                       text-white placeholder-slate-600
                       outline-none focus:border-gold-500/50 focus:bg-white/[0.07]
                       transition-all duration-300"
                    />
                </div>

                {/* City */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                        Город <span className="text-gold-500">*</span>
                    </label>
                    <select
                        value={data.city}
                        onChange={e => updateData({ city: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5
                       text-white outline-none focus:border-gold-500/50 focus:bg-white/[0.07]
                       transition-all duration-300 appearance-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                    >
                        <option value="" className="bg-cinema-900">Выберите город</option>
                        {CITIES.map(city => (
                            <option key={city} value={city} className="bg-cinema-900">{city}</option>
                        ))}
                    </select>
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                        Телефон <span className="text-gold-500">*</span>
                    </label>
                    <input
                        type="tel"
                        value={data.phone}
                        onChange={e => updateData({ phone: e.target.value })}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5
                       text-white placeholder-slate-600
                       outline-none focus:border-gold-500/50 focus:bg-white/[0.07]
                       transition-all duration-300"
                    />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                        Email <span className="text-gold-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={e => updateData({ email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5
                       text-white placeholder-slate-600
                       outline-none focus:border-gold-500/50 focus:bg-white/[0.07]
                       transition-all duration-300"
                    />
                </div>
            </div>
        </div>
    );
};
