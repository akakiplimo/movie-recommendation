'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Star } from 'lucide-react'
import { Movie } from '@/types'
import { getImageUrl, formatRating, formatDate } from '@/lib/api/utils'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MovieListProps {
  movies: Movie[]
  className?: string
}

export function MovieList({ movies, className }: MovieListProps) {
  if (!movies || movies.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">No movies found.</p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={`/movies/${movie.id}`}
          className="group flex gap-4 rounded-lg bg-card p-4 transition-all hover:bg-card/80 hover:shadow-lg"
        >
          {/* Poster */}
          <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src={getImageUrl(movie.poster_path, 'small')}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                {movie.title}
              </h3>
              
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(movie.release_date, 'year')}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  {formatRating(movie.vote_average)}
                </span>
              </div>

              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {movie.overview || 'No overview available.'}
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="mt-3 w-fit"
              onClick={(e) => {
                e.preventDefault()
                // Navigation handled by Link
              }}
            >
              View Details →
            </Button>
          </div>
        </Link>
      ))}
    </div>
  )
}