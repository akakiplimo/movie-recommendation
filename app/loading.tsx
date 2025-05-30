import { Skeleton } from '@/components/ui/skeleton'

export default function HomeLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <div className="relative h-[70vh] min-h-[500px] w-full">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Movie Sections */}
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="mb-6 flex items-center justify-between">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((j) => (
                <div key={j} className="w-48 flex-shrink-0">
                  <Skeleton className="aspect-[2/3] w-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}