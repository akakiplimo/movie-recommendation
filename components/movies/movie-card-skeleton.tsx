import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

interface MovieCardSkeletonProps {
  className?: string
}

export function MovieCardSkeleton({ className }: MovieCardSkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-card',
        className
      )}
    >
      {/* Poster Skeleton */}
      <div className="relative aspect-[2/3] w-full">
        <Skeleton className="h-full w-full" />
        
        {/* Rating Badge Skeleton */}
        <div className="absolute left-2 top-2">
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
      </div>
    </div>
  )
}