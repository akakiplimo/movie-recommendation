'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useDiscoverMovies, useGenres } from '@/lib/hooks/use-movies'
import { MovieGrid } from '@/components/movies/movie-grid'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const sortOptions = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Highest Rated' },
  { value: 'release_date.desc', label: 'Newest First' },
  { value: 'release_date.asc', label: 'Oldest First' },
  { value: 'title.asc', label: 'Title (A-Z)' },
  { value: 'title.desc', label: 'Title (Z-A)' },
]

export default function MoviesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: genres } = useGenres()
  
  // Get filter values from URL
  const genreParam = searchParams.get('genre') || ''
  const sortParam = searchParams.get('sort') || 'popularity.desc'
  
  // Create filters object
  const filters = {
    genre: genreParam ? Number(genreParam) : undefined,
    sort_by: sortParam as any,
  }
  
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useDiscoverMovies(filters)
  const movies = data?.pages.flatMap((page) => page.results) || []

  // Update URL when filters change
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    
    router.push(`/movies?${params.toString()}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">All Movies</h1>
        
        {/* Filters */}
        <div className="flex gap-2">
          <Select 
            value={genreParam || 'all'} 
            onValueChange={(value) => updateFilter('genre', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Genres" />
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

          <Select 
            value={sortParam} 
            onValueChange={(value) => updateFilter('sort', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Movies Grid */}
      <MovieGrid 
        movies={movies} 
        loading={isLoading}
        skeletonCount={20}
      />

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