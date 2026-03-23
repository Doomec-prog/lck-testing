export default function NewsLoading() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Title skeleton */}
        <div className="flex flex-col items-center space-y-4 mb-16">
          <div className="h-12 w-80 bg-white/[0.03] rounded-xl animate-pulse" />
          <div className="h-4 w-96 max-w-full bg-white/[0.03] rounded-full animate-pulse" />
        </div>

        {/* News grid skeleton — 4 columns matching NewsPage */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5">
              {/* Image placeholder */}
              <div className="aspect-video bg-white/[0.04] animate-pulse" />
              {/* Content placeholder */}
              <div className="p-6 space-y-4">
                <div className="h-3 w-24 bg-gold-500/10 rounded-full animate-pulse" />
                <div className="space-y-2">
                  <div className="h-5 w-full bg-white/[0.04] rounded-lg animate-pulse" />
                  <div className="h-5 w-3/4 bg-white/[0.04] rounded-lg animate-pulse" />
                </div>
                <div className="space-y-1.5 pt-2">
                  <div className="h-3 w-full bg-white/[0.03] rounded-full animate-pulse" />
                  <div className="h-3 w-5/6 bg-white/[0.03] rounded-full animate-pulse" />
                </div>
                <div className="pt-4 border-t border-white/5">
                  <div className="h-3 w-20 bg-gold-500/10 rounded-full animate-pulse ml-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
