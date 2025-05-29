'use client'

import { Movie } from '@/types'
import { MovieCard } from './movie-card'
import { MovieCardSkeleton } from './movie-card-skeleton'
import { cn } from '@/lib/utils'

interface MovieGridProps {
  movies: Movie[]
  loading?: boolean
  skeletonCount?: number
  className?: string
  emptyMessage?: string
}

export function MovieGrid({
  movies,
  loading = false,
  skeletonCount = 20,
  className,
  emptyMessage = 'No movies found.',
}: MovieGridProps) {
  if (loading) {
    return (
      <div
        className={cn(
          'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
          className
        )}
      >
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
        className
      )}
    >
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          priority={index < 6} // Prioritize first 6 images for LCP
        />
      ))}
    </div>
  )
}