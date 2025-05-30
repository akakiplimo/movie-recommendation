'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Info, Star, Calendar } from 'lucide-react'
import { Movie } from '@/types'
import { getImageUrl, formatRating, formatDate } from '@/lib/api/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  movies: Movie[]
}

export function HeroSection({ movies }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentMovie = movies[currentIndex]

  // Auto-rotate through movies
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length)
    }, 8000) // Change every 8 seconds

    return () => clearInterval(timer)
  }, [movies.length])

  if (!currentMovie) return null

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(currentMovie.backdrop_path, 'original')}
          alt={currentMovie.title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            {/* Movie Info */}
            <div className="mb-4 flex items-center gap-4 text-sm">
              <Badge variant="secondary" className="gap-1">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                {formatRating(currentMovie.vote_average)}
              </Badge>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {formatDate(currentMovie.release_date)}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {currentMovie.title}
            </h1>

            {/* Overview */}
            <p className="mb-8 line-clamp-3 text-lg text-muted-foreground">
              {currentMovie.overview}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2">
                <Play className="h-5 w-5" />
                Watch Trailer
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={`/movies/${currentMovie.id}`}>
                  <Info className="mr-2 h-5 w-5" />
                  More Info
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'h-1 w-8 rounded-full transition-all',
              index === currentIndex
                ? 'bg-primary w-12'
                : 'bg-white/50 hover:bg-white/70'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}