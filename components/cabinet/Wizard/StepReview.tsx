'use client';

import React from 'react';
import type { WizardData } from './WizardShell';

interface Props {
    data: WizardData;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-3">
        <h3 className="text-xs uppercase tracking-widest text-gold-500 font-semibold">{title}</h3>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 space-y-2">
            {children}
        </div>
    </div>
);

const Field = ({ label, value }: { label: string; value?: string }) => (
    <div className="flex justify-between items-start text-sm">
        <span className="text-slate-500">{label}</span>
        <span className={`text-right max-w-[60%] ${value ? 'text-white' : 'text-slate-600 italic'}`}>
            {value || 'Не указано'}
        </span>
    </div>
);

export const StepReview = ({ data }: Props) => {
    const filledLinks = data.filmography_links.filter(l => l.trim() !== '');
    const uploadedDocs = Object.keys(data.documents_urls);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-2xl md:text-3xl font-display uppercase text-white mb-2">
                    Проверка заявки
                </h2>
                <p className="text-slate-400 text-sm">
                    Проверьте данные перед отправкой. Вы можете вернуться назад и внести изменения.
                </p>
            </div>

            <div className="space-y-6">
                {/* Personal Data */}
                <Section title="Личные данные">
                    <Field label="ФИО" value={data.full_name} />
                    <Field label="Город" value={data.city} />
                    <Field label="Email" value={data.email} />
                    <Field label="Телефон" value={data.phone} />
                </Section>

                {/* Professional Data */}
                <Section title="Профессия">
                    <Field label="Специальность" value={data.profession} />
                    <Field label="Образование" value={data.education} />
                    {filledLinks.length > 0 && (
                        <div className="pt-1">
                            <span className="text-slate-500 text-sm">Фильмография:</span>
                            <ul className="mt-1 space-y-1">
                                {filledLinks.map((link, i) => (
                                    <li key={i}>
                                        <a
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gold-400 text-sm hover:text-gold-300 underline underline-offset-2 break-all"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Section>

                {/* Documents */}
                <Section title="Документы">
                    {uploadedDocs.length > 0 ? (
                        uploadedDocs.map(key => (
                            <div key={key} className="flex items-center gap-2 text-sm">
                                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-white capitalize">{key.replace(/_/g, ' ')}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-600 text-sm italic">Документы не загружены</p>
                    )}
                </Section>
            </div>

            {/* Confirmation Note */}
            <div className="rounded-xl border border-gold-500/20 bg-gold-500/5 p-4">
                <p className="text-sm text-gold-400">
                    ⚡ Нажимая «Отправить заявку», вы подтверждаете достоверность указанных данных
                    и даёте согласие на их обработку.
                </p>
            </div>
        </div>
    );
};
