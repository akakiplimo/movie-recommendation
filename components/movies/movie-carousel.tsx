'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Movie } from '@/types'
import { MovieCard } from './movie-card'
import { MovieCardSkeleton } from './movie-card-skeleton'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MovieCarouselProps {
  title: string
  movies: Movie[]
  loading?: boolean
  viewAllHref?: string
  className?: string
}

export function MovieCarousel({
  title,
  movies,
  loading = false,
  viewAllHref,
  className,
}: MovieCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const scrollAmount = container.offsetWidth * 0.8

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section className={cn('relative', className)}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            View All →
          </Link>
        )}
      </div>

      {/* Carousel Container */}
      <div className="relative -mx-4 px-4">
        {/* Left Arrow */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm shadow-lg opacity-0 transition-opacity hover:bg-background/90 group-hover:opacity-100"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Right Arrow */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm shadow-lg opacity-0 transition-opacity hover:bg-background/90 group-hover:opacity-100"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Movies Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {loading ? (
            // Show skeletons while loading
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-48 flex-shrink-0">
                <MovieCardSkeleton />
              </div>
            ))
          ) : (
            // Show movies
            movies.map((movie, index) => (
              <div key={movie.id} className="w-48 flex-shrink-0">
                <MovieCard movie={movie} priority={index < 3} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}