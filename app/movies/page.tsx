'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { usePopularMovies, useGenres } from '@/lib/hooks/use-movies'
import { MovieGrid } from '@/components/movies/movie-grid'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function MoviesPage() {
  const searchParams = useSearchParams()
  const genreId = searchParams.get('genre')
  
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = usePopularMovies()
  const { data: genres } = useGenres()

  const movies = data?.pages.flatMap((page) => page.results) || []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">All Movies</h1>
        
        {/* Filters */}
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {genres?.map((genre) => (
                <SelectItem key={genre.id} value={genre.id.toString()}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity.desc">Most Popular</SelectItem>
              <SelectItem value="vote_average.desc">Highest Rated</SelectItem>
              <SelectItem value="release_date.desc">Newest</SelectItem>
              <SelectItem value="release_date.asc">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Movies Grid */}
      <MovieGrid movies={movies} loading={isLoading} />

      {/* Load More */}
      {hasNextPage && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            size="lg"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  )
}