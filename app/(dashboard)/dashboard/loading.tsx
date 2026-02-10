export default function Loading() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-7 w-36 rounded-md animate-shimmer" />
        <div className="h-4 w-56 rounded-md animate-shimmer mt-2" />
      </div>

      {/* Input skeleton */}
      <div className="flex gap-2 mb-8">
        <div className="flex-1 h-11 rounded-lg animate-shimmer" />
        <div className="h-11 w-20 rounded-lg animate-shimmer" />
      </div>

      {/* Task card skeletons */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-5 py-4"
          >
            <div className="h-4 rounded-md animate-shimmer" style={{ width: `${55 + i * 8}%` }} />
            <div className="flex items-center gap-3 shrink-0">
              <div className="h-5 w-16 rounded-full animate-shimmer" />
              <div className="h-6 w-20 rounded-md animate-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
