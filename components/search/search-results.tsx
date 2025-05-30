'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { tmdbService } from '@/lib/api/tmdb.service'
import { MovieGrid } from '@/components/movies/movie-grid'
import { MovieList } from '@/components/movies/movie-list'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Grid3X3, List } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface SearchResultsProps {
  query: string
  filters: {
    genre?: string
    year?: string
    sort?: string
    minRating?: string
  }
}

export function SearchResults({ query, filters }: SearchResultsProps) {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['search', query, filters],
    queryFn: async ({ pageParam = 1 }) => {
      // If we have a query, use search endpoint
      if (query) {
        return tmdbService.searchMovies(query, pageParam)
      }
      
      // Otherwise, use discover endpoint with filters
      return tmdbService.discoverMovies({
        page: pageParam,
        genre: filters.genre ? Number(filters.genre) : undefined,
        year: filters.year ? Number(filters.year) : undefined,
        sort_by: filters.sort as any || 'popularity.desc',
      })
    },
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    enabled: true,
  })

  const movies = data?.pages.flatMap((page) => page.results) || []
  const totalResults = data?.pages[0]?.total_results || 0

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          An error occurred while searching. Please try again.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Count */}
      {!isLoading && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {totalResults === 0 ? (
              'No results found'
            ) : (
              <>
                Found <span className="font-medium text-foreground">{totalResults.toLocaleString()}</span> results
                {query && (
                  <>
                    {' '}for "<span className="font-medium text-foreground">{query}</span>"
                  </>
                )}
              </>
            )}
          </p>
        </div>
      )}

      {/* Results Display */}
      {totalResults > 0 ? (
        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="grid w-full max-w-[200px] grid-cols-2">
            <TabsTrigger value="grid" className="gap-2">
              <Grid3X3 className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="mt-6">
            <MovieGrid
              movies={movies}
              loading={isLoading}
              emptyMessage="No movies found. Try adjusting your filters."
            />
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <MovieList movies={movies} />
          </TabsContent>
        </Tabs>
      ) : !isLoading ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <p className="mb-2 text-lg font-medium">No movies found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search terms or filters
          </p>
        </div>
      ) : null}

      {/* Load More */}
      {hasNextPage && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            size="lg"
            variant="outline"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More Movies'}
          </Button>
        </div>
      )}
    </div>
  )
}