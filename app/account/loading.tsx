export default function AccountLoading() {
    return (
        <div className="min-h-screen bg-cinema-950 pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header Skeleton */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="h-10 w-64 md:w-80 bg-white/[0.03] rounded-xl animate-pulse mb-2"></div>
                        <div className="h-4 w-40 bg-white/[0.03] rounded-full animate-pulse"></div>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] animate-pulse flex-shrink-0"></div>
                </div>

                {/* Status Card Skeleton */}
                <div className="h-24 bg-white/[0.02] rounded-2xl animate-pulse"></div>

                {/* Two-Column Layout Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                    {/* Profile Card Skeleton */}
                    <div className="lg:col-span-3">
                        <div className="h-[400px] rounded-[2.5rem] bg-white/[0.02] animate-pulse p-8">
                            <div className="h-6 w-1/3 bg-white/[0.03] rounded-lg animate-pulse mb-8"></div>
                            <div className="space-y-6">
                                {Array(4).fill(0).map((_, i) => (
                                    <div key={i}>
                                        <div className="h-3 w-20 bg-white/[0.03] rounded animate-pulse mb-2"></div>
                                        <div className="h-5 w-48 bg-white/[0.03] rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Info Skeleton */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="h-[180px] rounded-2xl bg-white/[0.02] animate-pulse"></div>
                        <div className="h-[180px] rounded-2xl bg-white/[0.02] animate-pulse"></div>
                    </div>

                </div>

                {/* Feature Cards Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="h-32 rounded-2xl bg-white/[0.02] animate-pulse"></div>
                    <div className="h-32 rounded-2xl bg-white/[0.02] animate-pulse"></div>
                    <div className="h-32 rounded-2xl bg-white/[0.02] animate-pulse"></div>
                </div>

            </div>
        </div>
    );
}
