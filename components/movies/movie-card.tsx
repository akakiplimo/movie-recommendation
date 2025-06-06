'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Star, Calendar, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getImageUrl, formatRating, formatDate } from '@/lib/api/utils'
import { Movie } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface MovieCardProps {
  movie: Movie
  priority?: boolean
  className?: string
}

export function MovieCard({ movie, priority = false, className }: MovieCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={`/movies/${movie.id}`}
      className={cn(
        'group relative block overflow-hidden rounded-lg bg-card transition-all duration-300',
        'hover:scale-105 hover:shadow-xl hover:shadow-primary/10',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
        <Image
          src={imageError ? '/images/placeholder-movie.jpg' : getImageUrl(movie.poster_path, 'medium')}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          priority={priority}
          onError={() => setImageError(true)}
        />
        
        {/* Gradient Overlay on Hover */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent',
            'opacity-0 transition-opacity duration-300',
            isHovered && 'opacity-100'
          )}
        />

        {/* Rating Badge */}
        <div className="absolute left-2 top-2 z-10">
          <Badge className="bg-black/70 backdrop-blur-sm border-none px-2 py-1">
            <Star className="mr-1 h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span className="text-xs text-white font-medium">{formatRating(movie.vote_average)}</span>
          </Badge>
        </div>

        {/* Hover Content */}
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-4',
            'translate-y-full transition-transform duration-300',
            isHovered && 'translate-y-0'
          )}
        >
          {/* Title and Year */}
          <div>
            <h3 className="line-clamp-2 text-lg font-semibold text-white">
              {movie.title}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-300">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(movie.release_date, 'year')}</span>
            </div>
          </div>

          {/* Overview */}
          <p className="line-clamp-3 text-sm text-gray-200">
            {movie.overview || 'No overview available.'}
          </p>

          {/* View Details Button */}
          <Button
            size="sm"
            className="w-full bg-primary hover:bg-primary/90"
            onClick={(e) => {
              e.preventDefault()
              // Navigation is handled by the Link component
            }}
          >
            <Info className="mr-2 h-3 w-3" />
            View Details
          </Button>
        </div>
      </div>
    </Link>
  )
}