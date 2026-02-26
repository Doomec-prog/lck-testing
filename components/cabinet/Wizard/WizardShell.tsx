'use client';

import React, { useState, useCallback } from 'react';
import { StepPersonal } from './StepPersonal';
import { StepProfessional } from './StepProfessional';
import { StepDocuments } from './StepDocuments';
import { StepReview } from './StepReview';
import { createSupabaseBrowserClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export interface WizardData {
    // Step 1: Personal
    full_name: string;
    city: string;
    email: string;
    phone: string;
    // Step 2: Professional
    education: string;
    profession: string;
    filmography_links: string[];
    // Step 3: Documents
    documents_urls: Record<string, string>;
}

const INITIAL_DATA: WizardData = {
    full_name: '',
    city: '',
    email: '',
    phone: '',
    education: '',
    profession: '',
    filmography_links: [''],
    documents_urls: {},
};

const STEPS = [
    { id: 1, label: 'О себе', labelEn: 'Personal' },
    { id: 2, label: 'Профессия', labelEn: 'Professional' },
    { id: 3, label: 'Документы', labelEn: 'Documents' },
    { id: 4, label: 'Проверка', labelEn: 'Review' },
];

export const WizardShell = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [data, setData] = useState<WizardData>(INITIAL_DATA);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const updateData = useCallback((fields: Partial<WizardData>) => {
        setData(prev => ({ ...prev, ...fields }));
    }, []);

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const supabase = createSupabaseBrowserClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                setSubmitError('Вы не авторизованы. Пожалуйста, войдите снова.');
                setIsSubmitting(false);
                return;
            }

            // 1. Upsert Profile
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    full_name: data.full_name,
                    city: data.city,
                    status: 'applicant',
                    updated_at: new Date().toISOString(),
                });

            if (profileError) throw profileError;

            // 2. Insert Application
            const { error: appError } = await supabase
                .from('applications')
                .insert({
                    user_id: user.id,
                    full_name: data.full_name,
                    city: data.city,
                    email: data.email,
                    phone: data.phone,
                    education: data.education,
                    profession: data.profession,
                    filmography_links: data.filmography_links.filter(l => l.trim() !== ''),
                    documents_urls: data.documents_urls,
                    status: 'submitted',
                });

            if (appError) throw appError;

            setIsSuccess(true);
            setTimeout(() => router.push('/account'), 3000);
        } catch (err: any) {
            console.error('Submit error:', err);
            setSubmitError(err.message || 'Произошла ошибка при отправке.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="glass-panel rounded-3xl p-12 text-center animate-fade-in">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-3xl font-display uppercase text-white mb-3">Заявка отправлена!</h2>
                <p className="text-slate-400">Мы рассмотрим вашу заявку и свяжемся с вами.</p>
                <p className="text-slate-500 text-sm mt-4">Перенаправление...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Progress Bar */}
            <div className="mb-10">
                <div className="flex items-center justify-between max-w-lg mx-auto">
                    {STEPS.map((step, index) => (
                        <React.Fragment key={step.id}>
                            {/* Step Circle */}
                            <div className="flex flex-col items-center relative">
                                <div
                                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                    transition-all duration-500 ease-out
                    ${currentStep > step.id
                                            ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/30'
                                            : currentStep === step.id
                                                ? 'bg-gold-500/20 text-gold-400 border-2 border-gold-500 shadow-lg shadow-gold-500/20'
                                                : 'bg-white/5 text-slate-600 border border-white/10'
                                        }
                  `}
                                >
                                    {currentStep > step.id ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        step.id
                                    )}
                                </div>
                                <span className={`
                  text-xs mt-2 font-medium tracking-wide uppercase
                  transition-colors duration-300
                  ${currentStep >= step.id ? 'text-gold-400' : 'text-slate-600'}
                `}>
                                    {step.label}
                                </span>
                            </div>

                            {/* Connector Line */}
                            {index < STEPS.length - 1 && (
                                <div className="flex-1 h-px mx-3 relative -top-3">
                                    <div className="h-full bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-700 ease-out rounded-full"
                                            style={{ width: currentStep > step.id ? '100%' : '0%' }}
                                        />
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="glass-panel rounded-3xl p-8 md:p-12">
                {currentStep === 1 && <StepPersonal data={data} updateData={updateData} />}
                {currentStep === 2 && <StepProfessional data={data} updateData={updateData} />}
                {currentStep === 3 && <StepDocuments data={data} updateData={updateData} />}
                {currentStep === 4 && <StepReview data={data} />}

                {/* Error */}
                {submitError && (
                    <p className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                        {submitError}
                    </p>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/5">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`
              px-6 py-3 rounded-xl text-sm font-semibold uppercase tracking-widest
              transition-all duration-300
              ${currentStep === 1
                                ? 'opacity-0 pointer-events-none'
                                : 'text-slate-400 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5'
                            }
            `}
                    >
                        ← Назад
                    </button>

                    {currentStep < 4 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="px-8 py-3 rounded-xl bg-gold-500 text-black font-bold uppercase tracking-widest
                         transition-all duration-300 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20
                         active:scale-95"
                        >
                            Далее →
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-8 py-3 rounded-xl bg-emerald-500 text-white font-bold uppercase tracking-widest
                         transition-all duration-300 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20
                         active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center gap-3"
                        >
                            {isSubmitting && (
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            )}
                            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
