export default function NewsPostLoading() {
  return (
    <div className="min-h-screen bg-black">
      {/* Back button skeleton */}
      <div className="fixed top-6 left-6 z-50">
        <div className="h-10 w-28 bg-white/[0.04] backdrop-blur-md rounded-full animate-pulse" />
      </div>

      {/* Hero image skeleton */}
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] bg-[#0A0A0A]">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        {/* Subtle animated shimmer */}
        <div className="absolute inset-0 bg-white/[0.02] animate-pulse" />

        {/* Title overlay skeleton */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-5xl mx-auto space-y-4">
          <div className="h-3 w-32 bg-gold-500/15 rounded-full animate-pulse" />
          <div className="space-y-3">
            <div className="h-10 w-full max-w-2xl bg-white/[0.05] rounded-xl animate-pulse" />
            <div className="h-10 w-3/4 max-w-xl bg-white/[0.05] rounded-xl animate-pulse" />
          </div>
        </div>
      </div>

      {/* Article body skeleton */}
      <div className="relative bg-[#1A1A1A]">
        {/* Top gradient */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-8">
          {/* Paragraph blocks */}
          {Array(3).fill(0).map((_, blockIdx) => (
            <div key={blockIdx} className="space-y-3">
              {Array(4).fill(0).map((_, lineIdx) => (
                <div
                  key={lineIdx}
                  className="h-4 bg-white/[0.04] rounded-full animate-pulse"
                  style={{ width: `${85 - lineIdx * 8 + (blockIdx % 2) * 5}%` }}
                />
              ))}
            </div>
          ))}

          {/* Inline image skeleton */}
          <div className="h-64 md:h-96 w-full bg-white/[0.03] rounded-2xl animate-pulse my-12" />

          {/* More paragraphs */}
          {Array(2).fill(0).map((_, blockIdx) => (
            <div key={`b${blockIdx}`} className="space-y-3">
              {Array(3).fill(0).map((_, lineIdx) => (
                <div
                  key={lineIdx}
                  className="h-4 bg-white/[0.04] rounded-full animate-pulse"
                  style={{ width: `${90 - lineIdx * 12}%` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA skeleton */}
      <div className="bg-black py-16 flex justify-center">
        <div className="h-14 w-48 bg-white/[0.04] rounded-full animate-pulse" />
      </div>
    </div>
  );
}
