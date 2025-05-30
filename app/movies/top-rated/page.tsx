'use client'

import { useTopRatedMovies } from '@/lib/hooks/use-movies'
import { MovieGrid } from '@/components/movies/movie-grid'
import { Button } from '@/components/ui/button'

export default function TopRatedMoviesPage() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useTopRatedMovies()
  
  const movies = data?.pages.flatMap((page) => page.results) || []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Top Rated Movies</h1>
        <p className="mt-2 text-muted-foreground">
          Highest rated movies of all time
        </p>
      </div>

      <MovieGrid movies={movies} loading={isLoading} />

      {hasNextPage && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            size="lg"
            variant="outline"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  )
}