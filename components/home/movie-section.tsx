'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Movie } from '@/types'
import { MovieCarousel } from '@/components/movies/movie-carousel'
import { cn } from '@/lib/utils'

interface MovieSectionProps {
  title: string
  movies: Movie[]
  loading?: boolean
  viewAllHref?: string
  className?: string
}

export function MovieSection({
  title,
  movies,
  loading = false,
  viewAllHref,
  className,
}: MovieSectionProps) {
  return (
    <section className={cn('relative', className)}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="group flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            View All
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
      <MovieCarousel
        title=""
        movies={movies}
        loading={loading}
        viewAllHref={viewAllHref}
      />
    </section>
  )
}