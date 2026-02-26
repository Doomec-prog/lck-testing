'use client';

import React, { useCallback, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase';
import type { WizardData } from './WizardShell';

interface Props {
    data: WizardData;
    updateData: (fields: Partial<WizardData>) => void;
}

const DOCUMENT_TYPES = [
    { key: 'id_card', label: 'Удостоверение личности', hint: 'Скан или фото (JPG, PNG, PDF)' },
    { key: 'diploma', label: 'Диплом об образовании', hint: 'Профильное образование (если есть)' },
    { key: 'portfolio', label: 'Резюме / Портфолио', hint: 'CV или описание опыта (PDF)' },
];

interface UploadState {
    [key: string]: 'idle' | 'uploading' | 'done' | 'error';
}

export const StepDocuments = ({ data, updateData }: Props) => {
    const [uploadStates, setUploadStates] = useState<UploadState>({});
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleFileUpload = useCallback(async (docKey: string, file: File) => {
        setUploadStates(prev => ({ ...prev, [docKey]: 'uploading' }));
        setErrorMsg(null);

        try {
            const supabase = createSupabaseBrowserClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Не авторизован');

            const fileExt = file.name.split('.').pop();
            const filePath = `${user.id}/${docKey}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('cabinet-documents')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            // Get public URL (or signed URL for private buckets)
            const { data: urlData } = supabase.storage
                .from('cabinet-documents')
                .getPublicUrl(filePath);

            const newDocs = { ...data.documents_urls, [docKey]: urlData.publicUrl || filePath };
            updateData({ documents_urls: newDocs });
            setUploadStates(prev => ({ ...prev, [docKey]: 'done' }));
        } catch (err: any) {
            console.error('Upload error:', err);
            setErrorMsg(`Ошибка загрузки: ${err.message}`);
            setUploadStates(prev => ({ ...prev, [docKey]: 'error' }));
        }
    }, [data.documents_urls, updateData]);

    const handleDrop = useCallback((e: React.DragEvent, docKey: string) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        if (file) handleFileUpload(docKey, file);
    }, [handleFileUpload]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, docKey: string) => {
        const file = e.target.files?.[0];
        if (file) handleFileUpload(docKey, file);
    }, [handleFileUpload]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-2xl md:text-3xl font-display uppercase text-white mb-2">
                    Документы
                </h2>
                <p className="text-slate-400 text-sm">
                    Загрузите необходимые документы. Допустимые форматы: JPG, PNG, PDF (до 5 МБ).
                </p>
            </div>

            {/* Document Cards */}
            <div className="space-y-4">
                {DOCUMENT_TYPES.map(doc => {
                    const state = uploadStates[doc.key] || 'idle';
                    const isUploaded = !!data.documents_urls[doc.key];

                    return (
                        <div
                            key={doc.key}
                            onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
                            onDrop={e => handleDrop(e, doc.key)}
                            className={`
                relative rounded-2xl border-2 border-dashed p-6
                transition-all duration-300 group
                ${isUploaded
                                    ? 'border-emerald-500/30 bg-emerald-500/5'
                                    : state === 'error'
                                        ? 'border-red-500/30 bg-red-500/5'
                                        : 'border-white/10 bg-white/[0.02] hover:border-gold-500/30 hover:bg-white/[0.04]'
                                }
              `}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        {/* Icon */}
                                        <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center
                      ${isUploaded ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-500'}
                    `}>
                                            {isUploaded ? (
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m3 0l-3-3m3 3l-3 3M6.75 7.125v12.75A2.25 2.25 0 009 22.125h6a2.25 2.25 0 002.25-2.25" />
                                                </svg>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-white text-sm font-semibold">{doc.label}</h3>
                                            <p className="text-slate-500 text-xs">{doc.hint}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Upload Button / Status */}
                                <div className="flex-shrink-0 ml-4">
                                    {state === 'uploading' ? (
                                        <div className="flex items-center gap-2 text-gold-400 text-sm">
                                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Загрузка...
                                        </div>
                                    ) : isUploaded ? (
                                        <span className="text-emerald-400 text-sm font-medium">Загружено ✓</span>
                                    ) : (
                                        <label className="cursor-pointer px-4 py-2 rounded-xl border border-white/10 bg-white/5
                                    text-slate-300 text-sm hover:border-gold-500/30 hover:text-gold-400
                                    transition-all duration-300">
                                            Выбрать файл
                                            <input
                                                type="file"
                                                accept=".jpg,.jpeg,.png,.pdf"
                                                className="hidden"
                                                onChange={e => handleChange(e, doc.key)}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Drag Overlay hint */}
                            {!isUploaded && state !== 'uploading' && (
                                <p className="text-slate-600 text-xs mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    или перетащите файл сюда
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Error */}
            {errorMsg && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    {errorMsg}
                </p>
            )}

            {/* Note */}
            <p className="text-xs text-slate-600">
                Документы хранятся в зашифрованном виде и доступны только администрации Лиги.
            </p>
        </div>
    );
};
