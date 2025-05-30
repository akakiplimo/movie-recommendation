'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SearchFilters } from '@/components/search/search-filters'
import { SearchResults } from '@/components/search/search-results'
import { Skeleton } from '@/components/ui/skeleton'

function SearchContent() {
  const searchParams = useSearchParams()
  
  const query = searchParams.get('q') || ''
  const genre = searchParams.get('genre') || ''
  const year = searchParams.get('year') || ''
  const sort = searchParams.get('sort') || 'popularity.desc'
  const minRating = searchParams.get('min_rating') || '0'

  const filters = {
    genre,
    year,
    sort,
    minRating,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {query ? 'Search Results' : 'Discover Movies'}
        </h1>
        {query && (
          <p className="mt-2 text-muted-foreground">
            Searching for "{query}"
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="mb-6">
        <SearchFilters />
      </div>

      {/* Results */}
      <SearchResults query={query} filters={filters} />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchContent />
    </Suspense>
  )
}

function SearchPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mb-8 h-10 w-48" />
      <div className="mb-6 flex gap-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[2/3]" />
        ))}
      </div>
    </div>
  )
}