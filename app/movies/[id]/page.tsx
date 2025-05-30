'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star } from 'lucide-react'
import { useMovieDetails } from '@/lib/hooks/use-movies'
import { getImageUrl, formatRating, formatDate } from '@/lib/api/utils'
import { MovieInfo } from '@/components/movies/movie-info'
import { CastCrew } from '@/components/movies/cast-crew'
import { MovieActions } from '@/components/movies/movie-actions'
import { MovieCarousel } from '@/components/movies/movie-carousel'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import React, { Usable } from 'react'

export default function MovieDetailsPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>
}) {
  const { id } = React.use(params as Usable<{ id: string; }>)
  const { data, isLoading, error } = useMovieDetails(id)

  if (error) {
    notFound()
  }

  if (isLoading) {
    return <MovieDetailsLoading />
  }

  if (!data) {
    notFound()
  }

  const { details: movie, credits, similar, recommendations } = data

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        {/* Back Button */}
        <div className="relative z-10 container mx-auto px-4 pt-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-2 bg-background/20 backdrop-blur-sm hover:bg-background/30"
          >
            <Link href="/movies">
              <ArrowLeft className="h-4 w-4" />
              Back to Movies
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="relative -mt-32 z-10">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Poster */}
            <div className="mx-auto lg:mx-0">
              <div className="relative h-[450px] w-[300px] overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src={getImageUrl(movie.poster_path, 'large')}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Movie Details */}
            <div className="flex-1 space-y-6">
              {/* Title and Basic Info */}
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {movie.title}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span>{formatDate(movie.release_date)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    {formatRating(movie.vote_average)}
                  </span>
                  <span>•</span>
                  <span>{movie.runtime} min</span>
                </div>
              </div>

              {/* Actions */}
              <MovieActions movieId={movie.id} />

              {/* Movie Info */}
              <MovieInfo movie={movie} />
            </div>
          </div>
        </div>

        {/* Cast & Crew */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Cast & Crew</h2>
          <CastCrew cast={credits.cast} crew={credits.crew} />
        </div>

        {/* Similar Movies */}
        {similar.results.length > 0 && (
          <div className="mt-12">
            <MovieCarousel
              title="Similar Movies"
              movies={similar.results}
              viewAllHref={`/movies?similar_to=${movie.id}`}
            />
          </div>
        )}

        {/* Recommendations */}
        {recommendations.results.length > 0 && (
          <div className="mt-12">
            <MovieCarousel
              title="You Might Also Like"
              movies={recommendations.results}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// Loading component
function MovieDetailsLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 pb-12">
        <div className="relative -mt-32 z-10">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Poster Skeleton */}
            <Skeleton className="mx-auto h-[450px] w-[300px] rounded-lg lg:mx-0" />

            {/* Details Skeleton */}
            <div className="flex-1 space-y-6">
              <div>
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="mt-2 h-4 w-1/2" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
