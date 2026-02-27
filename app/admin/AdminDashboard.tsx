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
    const router = useRouter();

    const stats = {
        total: applications.length,
        submitted: applications.filter(a => a.status === 'submitted').length,
        approved: applications.filter(a => a.status === 'approved').length,
        rejected: applications.filter(a => a.status === 'rejected').length,
    };

    const handleStatusChange = useCallback(async (appId: string, userId: string, newStatus: string) => {
        const supabase = createSupabaseBrowserClient();

        // 1. Update application status
        const { error: appError } = await supabase
            .from('applications')
            .update({
                status: newStatus,
                updated_at: new Date().toISOString(),
            })
            .eq('id', appId);

        if (appError) {
            alert(`Ошибка: ${appError.message}`);
            return;
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
                console.error('Profile update error:', profileError);
            }
        }

        // 3. If rejected → keep profile as 'applicant'
        if (newStatus === 'rejected') {
            await supabase
                .from('profiles')
                .update({
                    status: 'applicant',
                    updated_at: new Date().toISOString(),
                })
                .eq('id', userId);
        }

        // Update local state
        setApplications(prev =>
            prev.map(a => a.id === appId ? { ...a, status: newStatus } : a)
        );

        router.refresh();
    }, [router]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-display uppercase text-white">
                    Панель <span className="text-gold-500">Администратора</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">Управление заявками на вступление в Лигу</p>
            </div>

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
