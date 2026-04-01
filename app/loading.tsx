export default function GlobalLoading() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Page title skeleton */}
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-72 bg-white/[0.03] rounded-xl animate-pulse" />
          <div className="h-4 w-96 max-w-full bg-white/[0.03] rounded-full animate-pulse" />
        </div>

        {/* Content block skeleton */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="h-56 w-full bg-white/[0.02] rounded-2xl animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-white/[0.03] rounded-full animate-pulse" />
            <div className="h-4 w-5/6 bg-white/[0.03] rounded-full animate-pulse" />
            <div className="h-4 w-4/6 bg-white/[0.03] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
