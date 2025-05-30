'use client'

import { useUpcomingMovies } from '@/lib/hooks/use-movies'
import { MovieGrid } from '@/components/movies/movie-grid'

export default function UpcomingMoviesPage() {
  const { data, isLoading } = useUpcomingMovies()
  
  const movies = data?.results || []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Upcoming Movies</h1>
        <p className="mt-2 text-muted-foreground">
          Movies coming to theaters soon
        </p>
      </div>

      <MovieGrid movies={movies} loading={isLoading} />
    </div>
  )
}