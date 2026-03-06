'use client';

import React, { useState, useCallback } from 'react';
import { StatsBar } from '@/components/admin/StatsBar';
import { ApplicationsTable, type ApplicationRow } from '@/components/admin/ApplicationsTable';
import { createSupabaseBrowserClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface Props {
    applications: ApplicationRow[];
}

function generateMembershipId(): string {
    const year = new Date().getFullYear();
    const seq = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
    return `LCK-${year}-${seq}`;
}

export const AdminDashboard = ({ applications: initialApps }: Props) => {
    const [applications, setApplications] = useState(initialApps);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const stats = {
        total: applications.length,
        submitted: applications.filter(a => a.status === 'submitted').length,
        approved: applications.filter(a => a.status === 'approved').length,
        rejected: applications.filter(a => a.status === 'rejected').length,
    };

    const handleStatusChange = useCallback(async (appId: string, userId: string, newStatus: string) => {
        setError(null);
        const supabase = createSupabaseBrowserClient();
        const previousApp = applications.find(a => a.id === appId);
        const previousStatus = previousApp?.status || 'submitted';

        try {
            // 1. Update application status
            const { error: appError } = await supabase
                .from('applications')
                .update({
                    status: newStatus,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', appId);

            if (appError) {
                throw new Error(`Ошибка обновления заявки: ${appError.message}`);
            }

            // 2. If approved → update profile to 'member' + generate membership_id
            if (newStatus === 'approved') {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .update({
                        status: 'member',
                        membership_id: generateMembershipId(),
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', userId);

                if (profileError) {
                    // ROLLBACK: revert application status since profile update failed
                    console.error('Profile update failed, rolling back application:', profileError);
                    const { error: rollbackError } = await supabase
                        .from('applications')
                        .update({
                            status: previousStatus,
                            updated_at: new Date().toISOString(),
                        })
                        .eq('id', appId);

                    if (rollbackError) {
                        console.error('Rollback also failed:', rollbackError);
                    }

                    throw new Error(`Ошибка обновления профиля: ${profileError.message}. Заявка откачена к прежнему статусу.`);
                }
            }

            // 3. If rejected → ensure profile stays as 'applicant'
            if (newStatus === 'rejected') {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .update({
                        status: 'applicant',
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', userId);

                if (profileError) {
                    console.error('Profile update error on reject:', profileError);
                    // Non-critical: application is already rejected, just log
                    setError(`Заявка отклонена, но профиль не обновлён: ${profileError.message}`);
                }
            }

            // Update local state
            setApplications(prev =>
                prev.map(a => a.id === appId ? { ...a, status: newStatus } : a)
            );

            router.refresh();
        } catch (err: any) {
            console.error('Status change error:', err);
            setError(err.message || 'Произошла неизвестная ошибка');
        }
    }, [applications, router]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-display uppercase text-white">
                    Панель <span className="text-gold-500">Администратора</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">Управление заявками на вступление в Лигу</p>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 flex items-start gap-3">
                    <span className="text-red-400 text-lg flex-shrink-0">⚠️</span>
                    <div className="flex-1">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                    <button
                        onClick={() => setError(null)}
                        className="text-red-400/60 hover:text-red-400 transition-colors text-sm"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Stats */}
            <StatsBar {...stats} />

            {/* Table */}
            <ApplicationsTable
                applications={applications}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
};
